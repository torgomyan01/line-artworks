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

//

let status = false;
sliderContentButtonsPlay.addEventListener('click', function () {
  if (status) {
    int = startAutoLoadingSlider();
    sliderContentButtonsPlay.classList.remove(active);
    sliderContentButtonsPrev.querySelector('i').style.transform = 'rotate(-90deg)';
    sliderContentButtonsNext.querySelector('i').style.transform = 'rotate(-90deg)';
  } else {
    clearInterval(int);
    sliderContentButtonsPlay.classList.add(active);
    sliderContentButtonsPrev.querySelector('i').style.transform = 'rotate(90deg)';
    sliderContentButtonsNext.querySelector('i').style.transform = 'rotate(90deg)';
    int = undefined;
  }

  status = !status;
})
//
// // PREV SLIDER FUNCTION
// sliderContentButtonsPrev.addEventListener('click', function (){
//   if(sliderActiveIndex > 0){
//     sliderActiveIndex -= 1;
//   }
//   percent = 0;
//
//   if(sliderActiveIndex === sliderInfo.length - 1){
//     sliderActiveIndex = 0;
//   }
//   nextSlider()
// })


// NEXT SLIDER FUNCTION
sliderContentButtonsNext.addEventListener('click', function () {
  sliderActiveIndex += 1;
  percent = 0;

  if (sliderActiveIndex === sliderInfo.length - 1) {
    sliderActiveIndex = 0;
  }

  nextAnimation()

  // setTimeout(() => {
  //   startNextAnimation();
  // }, 4000)
})

//
//


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
    // sliderContentItemImg.forEach((elem) => {
    //   elem.parentElement.classList.remove(active);
    // });
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

navMenu.addEventListener('click', function () {
  navMenu.classList.toggle(active)
})

function startAutoLoadingSlider() {
  return setInterval(() => {
    percent += 1;
    progressBar.setAttribute('style', `--percent: ${percent}%`);

    if (percent === 7) {
      startNextAnimation()
    }

    if (percent === 99) {
      nextAnimation()
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
const footerHashtagsItem = $('.footer-hashtags-item ');


function startNextAnimation() {
  const getActiveInfo = sliderInfo[sliderActiveIndex];
  const randomId = `and_project_${Math.floor(Math.random() * 1000)}`;

  const title = getActiveInfo.title.split('|').map((item, index) => `<span style="transition-delay: 1.${index * 3}s;">${item}</span> <br />`).join('')

  setTimeout(() => {
    footerHashtagsItem.forEach((item) => item.classList.remove(active))
    footerHashtagsItem[sliderActiveIndex].classList.add(active)
  }, 1000)


  animationContent.insertAdjacentHTML('beforeend', `
      <div class="slider-content-max" id="${randomId}">
         <img src="${getActiveInfo.img}" class="slider-content-img" alt="slider" width="1560" height="884">
         <h2 class="slider-content-max-title">
           <b class="type">${getActiveInfo.type}</b>
           ${title}
         </h2>
      </div>
    `);

  const sliderContentMax = $el(`#${randomId}`);
  const sliderContentMaxOffset = sliderContentMax.getBoundingClientRect();


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

    }, 2000)

  }, 500)
}



function printHeight(height){
  if(window.innerHeight < 1000){
    return height + 100
  } else {
    return height
  }
}

function nextAnimation() {
  const elem = $el('.slider-content-max');

  elem.style.transform = 'scale(0.8)';

  setTimeout(() => {
    elem.style.top = '-100vh';
    elem.style.opacity = '0';

    setTimeout(() => {
      elem.outerHTML = '';
    }, 1000)

  }, 1000)

}

