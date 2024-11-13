const {
  active,
  none,
  show,
  closed,
  preparing

} = {
  active: 'active',
  none: 'd-none',
  show: 'show',
  closed: 'closed',
  preparing: 'preparing',
}

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
});


function $el(name) {
  return document.querySelector(name);
}

function $(name) {
  return document.querySelectorAll(name);
}


const sliderInfo = [
  {
    type: 'Emirates <br> Global Aluminium',
    title: 'Women|in Heavy|Industry',
    img: 'images/slider-image-1.png',
    hashtag: 'Video'
  },
  {
    type: 'Air Samarkand',
    title: 'New Airline|of Uzbekistan',
    img: 'images/slider-image-2.png',
    hashtag: 'Production'
  },
  {
    type: 'AGC Glass',
    title: 'Industrial|photoshop|for Agc Glass',
    img: 'images/slider-image-3.png',
    hashtag: 'Aviation'
  },
  {
    type: 'EuroChem Group AG',
    title: 'Image|photoshoot ',
    img: 'images/slider-image-4.png',
    hashtag: 'Construction'
  },
  {
    type: 'EMCO',
    title: 'Industrial|Photography|at Emco',
    img: 'images/slider-image-5.png',
    hashtag: 'People'
  },
];

const footerHashtags = $el('.footer-hashtags');
const sliderContentInfoContent = $el('.slider-content-info-content');

const PrintHashtagItem = (item, index) => `<span class="footer-hashtags-item ${index === 0 ? 'active' : ''}">#${item.hashtag}</span>`;

sliderInfo.forEach((item, index) => {

  footerHashtags.insertAdjacentHTML('beforeend', PrintHashtagItem(item, index))

  const title = item.title.split('|').map((titleItem) => `<span>${titleItem}</span> <br />`).join('')

  sliderContentInfoContent.insertAdjacentHTML('beforeend', `
  
    <div class="slider-content-item">
       <img src="${item.img}" class="slider-content-item-img" alt="slider" width="1560" height="884">
       <h4 class="slider-content-item-type">${item.type}</h4>
       <h2 class="slider-content-item-title">${title}</h2>
    </div>
  
  `)

});
//

//
const playPause = $el('#play-pause path');
const sliderContentButtonsPlay = $el('.slider-content-buttons-play');
const sliderContentButtonsPrev = $el('.slider-content-buttons-prev');
const sliderContentButtonsNext = $el('.slider-content-buttons-next');
const progressBar = $el('.progress-bar');

let sliderActiveIndex = 0;
let percent = 0;
let int;

function startProgress() {
  int = startAutoLoadingSlider();
}

startProgress();


let status = false;
sliderContentButtonsPlay.addEventListener('click', function () {
  const items = $('.slider-content-item')[sliderActiveIndex];
  const id = sliderContentButtonsPrev.dataset.active;

  const getActiveItem = $el(`#${id}`);

  if (status) {
    if(percent){
      int = startAutoLoadingSlider();
    }
    sliderContentButtonsPlay.classList.remove(active);
    sliderContentButtonsPrev.querySelector('i').style.transform = 'rotate(0deg)';
    sliderContentButtonsNext.querySelector('i').style.transform = 'rotate(0deg)';
    getActiveItem.classList.remove(active);
    document.body.classList.add('active-slider')
  } else {
    clearInterval(int);

    sliderContentButtonsPlay.classList.add(active);
    sliderContentButtonsPrev.querySelector('i').style.transform = 'rotate(90deg)';
    sliderContentButtonsNext.querySelector('i').style.transform = 'rotate(90deg)';
    int = undefined;

    getActiveItem.classList.add(active);

    sliderContentInfoContent.scrollTo({
      top: items.offsetTop,
      left: 0,
      behavior: "smooth",
    })

    document.body.classList.remove('active-slider')

  }

  status = !status;
})

let successClickNextPrev = 1;

// PREV SLIDER FUNCTION
sliderContentButtonsPrev.addEventListener('click', function () {


  if(successClickNextPrev > 1){
    console.warn('user click fast prev button')
  } else if(successClickNextPrev === 1) {
    sliderActiveIndex -= 1;

    if (sliderActiveIndex < 0) {
      sliderActiveIndex = sliderInfo.length - 1;
    }

    percent = 0;
    progressBar.setAttribute('style', `--percent: 0%`);
    clearInterval(int);

    nextAnimation(false)

    setTimeout(() => {
      startNextAnimation(false)
    }, 500)
  }

  successClickNextPrev += 1;

})


// NEXT SLIDER FUNCTION
sliderContentButtonsNext.addEventListener('click', function () {

  if(successClickNextPrev > 1){
    console.warn('user click fast next button')
  } else if(successClickNextPrev === 1) {
    sliderActiveIndex += 1;

    if (sliderActiveIndex > sliderInfo.length - 1) {
      sliderActiveIndex = 0;
    }

    percent = 0;
    progressBar.setAttribute('style', `--percent: 0%`);
    clearInterval(int);

    nextAnimation(true)

    setTimeout(() => {
      startNextAnimation(true)
    }, 500)
  }

  successClickNextPrev += 1;


})


const sliderItems = gsap.utils.toArray(".slider-content-item");

sliderItems.forEach((item) => {
  gsap.fromTo(item,
    {scale: 1},
    {
      scrollTrigger: {
        trigger: item,
        scroller: sliderContentInfoContent,
        start: 'top top-=-60%',
        end: 'top top-=-10%',
        scrub: true,
        markers: false,
        onUpdate: function (e) {
          const percent = e.progress * 100;

          const img = item.querySelector('img');
          const title = item.querySelector('.slider-content-item-title');
          const type = item.querySelector('.slider-content-item-type');

          const obj = {
            imgScale: 0.7,
            textLeftPercent: 16
          }

          item.setAttribute('data-percent', percent)

          const calc = obj.imgScale + 0.3 * percent / 100;
          const titleLeft = 7 * percent / 100;
          const top = 10 - 10 * percent / 100;
          const topType = 26 - 26 * percent / 100;

          img.style.transform = `scale(${calc})`;

          title.style.transform = `scale(${calc})`;
          title.style.left = `${obj.textLeftPercent + titleLeft}%`;
          // title.style.top = `${30 + top}%`;

          type.style.transform = `scale(${calc})`;
          type.style.left = `${obj.textLeftPercent + titleLeft}%`;
          // type.style.top = `${16 + topType}%`;


          // sliderItems.forEach((_elem) => {
          //   const getDontActiveElem = +_elem.dataset.percent;
          //
          //
          //   if (getDontActiveElem === 100){
          //     console.log(getDontActiveElem)
          //   } else {
          //
          //   }
          // })

        }
      }
    }
  );
})

const sliderContentItemImg = $('.slider-content-item img');
const sliderContentInfo = $el('.slider-content-info')
const sliderContent = $el('.slider-content');
const footer = $el('.footer');


sliderContentItemImg.forEach((item) => {
  item.addEventListener('click', function () {
    item.parentElement.classList.add(show);

    sliderContentItemImg.forEach((elem) => {
      if (!elem.parentElement.classList.contains(show)) {
        elem.parentElement.style.opacity = '0';
      }
    })

    setTimeout(() => {
      item.parentElement.style.position = 'absolute';
    }, 700)

    setTimeout(() => {
      sliderContentItemImg.forEach((elem) => {
        if (elem.parentElement.classList.contains(show)) {
          elem.parentElement.style.opacity = '0';
        }
      })
    }, 600)

    setTimeout(() => {
      sliderContentInfo.classList.add(active);
      sliderContent.classList.remove(active)
      footer.classList.remove(active)
      item.parentElement.classList.add(active);
      item.parentElement.style.opacity = '1';
    }, 1000)


  })
})


// ------------------------------
// ----------- MENU--------------
// ------------------------------

const navMenu = $el('.nav-menu');
const menu = $el('.menu');
const nav = $el('.nav');
const menuRightLanguageItem = $('.menu-right-language-item');
const menuRightContent = $('.menu-right-content');

navMenu.addEventListener('click', function () {
  if (navMenu.classList.contains(active)) {
    navMenu.classList.remove(active);
    menu.classList.remove(active);
    nav.style.backgroundColor = 'transparent';

    setTimeout(() => {
      menu.style.width = '0';
    }, 1500)
  } else {
    navMenu.classList.add(active);
    menu.style.width = '100%';
    nav.style.backgroundColor = '#fff';

    setTimeout(() => {
      menu.classList.add(active)
    }, 1000)
  }

})


menuRightLanguageItem.forEach((tab) => {
  tab.addEventListener('click', function (){
    const type = this.innerText;
    const selectedTab = $el(`[data-lang="${type}"]`);

    menuRightLanguageItem.forEach((item) => item.classList.remove(active));
    menuRightContent.forEach((item) => item.classList.remove(active));

    this.classList.add(active)
    selectedTab.classList.add(active)
  })
})







function startAutoLoadingSlider() {
  return setInterval(() => {
    percent += 1;
    progressBar.setAttribute('style', `--percent: ${percent}%`);

    if (percent === 5) {
      startNextAnimation(true)
    }

    if (percent === 99) {
      nextAnimation(true)
    }

    if (percent === 100) {
      percent = 0;
      sliderActiveIndex += 1;


      if (sliderActiveIndex === sliderInfo.length - 1) {
        sliderActiveIndex = 0;
      }
    }
  }, 100)
}


const animationContent = $el('.animation-content');
const footerHashtagsItem = $('.footer-hashtags-item');


footerHashtagsItem.forEach((item, index) => {
  item.addEventListener('click', function () {
    percent = 0;
    progressBar.setAttribute('style', `--percent: 0%`);
    clearInterval(int);

    if (index < sliderActiveIndex) {
      sliderActiveIndex = index;

      nextAnimation(false);

      setTimeout(() => {
        startNextAnimation(false)
      }, 500)

    } else {
      sliderActiveIndex = index;

      nextAnimation(true);

      setTimeout(() => {
        startNextAnimation(true)
      }, 500)
    }
  })
})

function startNextAnimation(status) {
  const getActiveInfo = sliderInfo[sliderActiveIndex];
  const randomId = `and_project_${Math.floor(Math.random() * 1000)}`;
  console.log(sliderActiveIndex)

  const title = getActiveInfo.title.split('|').map((item, index) => `<span style="transition-delay: 1.${index * 3}s;">${item}</span> <br />`).join('')


  setTimeout(() => {
    footerHashtagsItem.forEach((item) => item.classList.remove(active))
    footerHashtagsItem[sliderActiveIndex].classList.add(active);
  }, 1000)

  sliderContentButtonsPrev.setAttribute('data-active', randomId);


  animationContent.insertAdjacentHTML('beforeend', `
      <div class="slider-content-max" id="${randomId}" style="top: ${status ? '100vh' : 'calc(-100vh - 130px)'}">
         <img src="${getActiveInfo.img}" class="slider-content-img" alt="slider" width="1560" height="884">
         <h2 class="slider-content-max-title">
           <b class="type">${getActiveInfo.type}</b>
           ${title}
         </h2>
      </div>
    `);

  getCenterActiveElem(randomId);
}


function printHeight(height) {
  if (window.innerHeight < 1000) {
    return height + 100
  } else {
    return height
  }
}

function nextAnimation(status) {
  console.log(sliderActiveIndex, successClickNextPrev)
  const getActiveSlider = sliderContentButtonsPrev.getAttribute('data-active');
  const elem = $el(`#${getActiveSlider}`);

  elem.style.transform = 'scale(0.8)';

  setTimeout(() => {
    elem.style.top = status ? '-100vh' : '100vh';
    elem.style.opacity = '0';

    setTimeout(() => {
      elem.outerHTML = '';
    }, 1000)

  }, 1000)

}


function getCenterActiveElem(randomId) {
  const sliderContentMax = $el(`#${randomId}`);
  const sliderContentMaxOffset = sliderContentMax.getBoundingClientRect();


  sliderContentMax.style.transition = `0.3s`;
  sliderContentMax.style.left = `-${sliderContentMaxOffset.left}px`;
  sliderContentMax.style.width = `${window.innerWidth}px`;
  sliderContentMax.style.height = `${window.innerHeight}px`;

  setTimeout(() => {
    sliderContentMax.style.top = `-7.625rem`;

    setTimeout(() => {
      sliderContentMax.style.left = `0`;
      sliderContentMax.style.top = `0`;
      sliderContentMax.style.width = `calc(100% - 12.5rem)`;
      sliderContentMax.style.height = `${printHeight(sliderContentMaxOffset.height)}px`;
      sliderContentMax.classList.add(show)

      successClickNextPrev = 1;

    }, 1500)

    sliderContentMax.style.transition = `0.8s`;
  }, 500)
}



