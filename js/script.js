const {
  active,
  show,
  closed,
  preparing

} = {
  active: 'active',
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


const hashtags = {
  aviation: `Aviation`,
  developers: `Developers`,
  industrial: `Industrial`,
  production: `Production`,
};

const sliderInfo = [
  {
    type: "",
    title: "",
    video: 'video/cover.mp4',
    img: `https://line-artworks.com/wp-content/uploads/2025/01/as_01.jpg`,
    hashtag: `Aviation`,
    logo: ``,
    url: `https://line-artworks.com/project/new-airlineof-uzbekistan/`,
  },
  {
    type: `<p>Amwaj</p>`,
    title: `Urban Focus | in Baghdad`,
    img: `https://line-artworks.com/wp-content/uploads/2025/01/header.png`,
    hashtag: `Developers`,
    logo: ``,
    url: `https://line-artworks.com/project/amwaj-advertising-photography/`,
  },
  {
    type: `<p>EuroChem Group AG</p>`,
    title: `Underground | Heroes`,
    img: `https://line-artworks.com/wp-content/uploads/2025/01/ec_01.jpg`,
    hashtag: `Industrial`,
    logo: `https://line-artworks.com/wp-content/uploads/2025/01/top-nomination.png`,
    url: `https://line-artworks.com/project/image-photoshoot-eurochem/`,
  },
  {
    type: `<p>AGC Glass</p>`,
    title: `Industrial | Clarity`,
    img: `https://line-artworks.com/wp-content/uploads/2025/01/agc_03.jpg`,
    hashtag: `Industrial`,
    logo: ``,
    url: `https://line-artworks.com/project/industrial-agc-glass/`,
  },
  {
    type: `<p>Emirates Global Aluminium</p>`,
    title: `Women in Heavy | Industry`,
    img: `https://line-artworks.com/wp-content/uploads/2025/01/ega_01.jpg`,
    hashtag: `Production`,
    logo: ``,
    url: `https://line-artworks.com/project/women-in-heavy-industry/`,
  },
];



// ------------------------------
// ----------- MENU--------------
// ------------------------------

const navMenu = $el('.nav-menu');
const footerContact = $('.footer-contact');
const menuItemContact = $el('.menu-item-contact');
const menuBackContact = $el('.menu-back-contact');
const menu = $el('.menu');
const nav = $el('.nav');
const menuRightLanguageItem = $('.menu-right-language-item');
const menuRightContent = $('.menu-right-content');

navMenu?.addEventListener('click', function () {
  if (navMenu.classList.contains(active)) {

    document.body.style.overflow = null;
    navMenu.classList.remove(active);
    menu.classList.remove(active);
    menu.querySelector('.menu-items').classList.remove(active);
    menu.querySelector('.menu-contact').classList.remove(active);
    menu.querySelector('.menu-back-contact').classList.remove(active);

    setTimeout(() => {
      menu.style.width = '0';
      nav.style.backgroundColor = 'transparent';
    }, 1500);

  } else {
    document.body.style.overflow = 'hidden';
    navMenu.classList.add(active);
    menu.style.width = '100%';
    nav.style.backgroundColor = '#fff';
    menu.querySelector('.menu-back-contact').classList.remove(active);

    setTimeout(() => {
      menu.classList.add(active);
      menu.querySelector('.menu-items').classList.add(active);
    }, 1000)
  }

})

footerContact.forEach((item) => {
  item.addEventListener('click', function () {
    window.scrollTo(0, 0)
    navMenu.classList.add(active);
    menu.style.width = '100%';
    nav.style.backgroundColor = '#fff';

    setTimeout(() => {
      menu.classList.add(active);
      menu.querySelector('.menu-contact').classList.add(active);
    }, 1000)
  })
})





menuItemContact?.addEventListener('click', function () {
  menu.querySelector('.menu-items').style.transition = '0s';
  menu.querySelector('.menu-items').classList.remove(active);

  setTimeout(() => {
    menu.querySelector('.menu-items').style.transition = '1s';
  }, 1000)


  setTimeout(() => {
    menu.querySelector('.menu-contact').classList.add(active);
    menu.querySelector('.menu-back-contact').classList.add(active);
  }, 1000)
})

menuBackContact?.addEventListener('click', function () {
  menu.querySelector('.menu-contact').classList.remove(active);
  menu.querySelector('.menu-back-contact').classList.remove(active);

  setTimeout(() => {
    menu.querySelector('.menu-items').classList.add(active);
  }, 1000)
})


menuRightLanguageItem.forEach((tab) => {
  tab?.addEventListener('click', function () {
    const type = this.innerText;
    const selectedTab = $(`[data-lang="${type}"]`);

    menuRightLanguageItem.forEach((item) => item.classList.remove(active));
    menuRightContent.forEach((item) => item.classList.remove(active));

    this.classList.add(active)


    selectedTab.forEach((item) => {
      item.classList.add(active);
    })
    selectedTab.classList.add(active)
  })
})


const GetMenuFormCheckbox = $('.menu-contact .def-checkbox');
const _chb = [];

GetMenuFormCheckbox.forEach((item, index) => {

  _chb.push(item.outerHTML);

  item.outerHTML = `<div id="_menu_form_checkbox_${index}"></div>`;
})

checkFormCheckbox()
function checkFormCheckbox(){
  if(window.innerWidth > 768){
    $el('#_menu_form_checkbox_0').innerHTML = _chb[0];
    $el('#_menu_form_checkbox_1').innerHTML = '';
  } else {
    $el('#_menu_form_checkbox_1').innerHTML = _chb[1];
    $el('#_menu_form_checkbox_0').innerHTML = '';
  }
}
window.addEventListener('resize', checkFormCheckbox)

// DEFAULT INPUT
const inpLabel = $('.def-input');

startWorkingTextFields($('.def-input input'), inpLabel); // FOR INPUTS
startWorkingTextFields($('.def-input textarea'), inpLabel); // FOR LABELS

function startWorkingTextFields(inputs, parents) {
  inputs.forEach((item) => {
    item?.addEventListener('blur', function () {
      parents.forEach((inp) => {
        if (inp.querySelector('input')?.value === '' || inp.querySelector('textarea')?.value === '') {
          inp.classList.remove(active)
        }
      })
    })

    item?.addEventListener('input', function () {
      validateInput(item)
    })
  })

  inputs.forEach((item) => {
    item?.addEventListener('focus', function () {
      item.parentElement.classList.add(active)
    })
  })
}


function validateInput(input) {
  const validations = input.getAttribute('data-validation')?.split(',');
  const value = input.value.trim();
  let errorMessage = '';

  validations.forEach(validation => {
    if (errorMessage) return;

    if (validation === 'required' && value === '') {
      errorMessage = 'This field is required';
    } else if (validation === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorMessage = 'Please enter a valid email address';
    } else if (validation.startsWith('textMin-')) {
      const minLength = parseInt(validation.split('-')[1], 10);
      if (value.length < minLength) {
        errorMessage = `Text must be at least ${minLength} characters long`;
      }
    } else if (validation.startsWith('textMax-')) {
      const maxLength = parseInt(validation.split('-')[1], 10);
      if (value.length > maxLength) {
        errorMessage = `Text must have a maximum of ${maxLength} characters`;
      }
    } else if (validation === 'phone' && !/^\+?\d{3,30}$/.test(value)) {
      errorMessage = 'Enter a valid phone number';
    }
  });

  const errorSpan = input.parentElement;
  errorSpan.querySelectorAll('b').forEach((item) => {
    item.outerHTML = '';
    console.log(222)
  })


  if (errorMessage) {
    errorSpan.insertAdjacentHTML('beforeend', `
      <b class="def-input-error">
        <i class="icon-warning"></i>
        ${errorMessage}
      </b>
    `)
  }

}



if (document.body.dataset.page === 'home'){

  const footerHashtags = $el('.footer-hashtags');
  const sliderContentInfoContent = $el('.slider-content-info-content');
  const _mobileSliderBody = $el('.mobile-slider-body');
  const mobileSliderHashtags = $el('.mobile-slider-hashtags');

  const PrintHashtagItem = (item, index) => `<span class="footer-hashtags-item ${index === 0 ? 'active' : ''}" data-hashtag="${item}">#${item}</span>`;
  const PrintHashtagItemMobile = (item, index) => `<span class="mobile-slider-hashtags-item" data-hashtagmobile="${item}">#${item}</span>`;


  Object.values(hashtags).forEach((value, index) => {
    footerHashtags?.insertAdjacentHTML('beforeend', PrintHashtagItem(value, index))
    mobileSliderHashtags?.insertAdjacentHTML('beforeend', PrintHashtagItemMobile(value, index))
  })

  sliderInfo.forEach((item) => {
    const title = item.title.split('|').map((titleItem) => `<span>${titleItem}</span> <br />`).join('')

    sliderContentInfoContent?.insertAdjacentHTML('beforeend', `
    <div class="slider-content-item" data-typehashtag="${item.hashtag}">
       <img src="${item.img}" class="slider-content-item-img" alt="slider" width="1560" height="884">
       <h4 class="slider-content-item-type">${item.type}</h4>
       <h2 class="slider-content-item-title">${title}</h2>
    </div>
  `)
  });

  sliderInfo.forEach((item, index) => {
    const title = item.title.split('|').map((titleItem) => `<span>${titleItem}</span> <br />`).join('')

    const videoID = `video__${index}`;

    _mobileSliderBody?.insertAdjacentHTML('beforeend', `
         <div class="mobile-slider-item">
            <div class="mobile-slider-item-body">
              ${
                  item.video ? `
                    <div class="mobile-video-block" id="${videoID}">
                      <video width="100%" height="100%" autoplay muted loop class="slider-content-img slider-content-max-img" id="video-block-mobile">
                          <source src="${item.video}" type="video/mp4">
                      </video>
                        
                      <div class="video-propagation-mobile">
                        <i class="icon-pause"></i>
                      </div>
                    </div>
                  
                  ` : `<img src="${item.img}" alt="mobile-header-image" class="mobile-slider-item-body-image">`
                }
             
              ${item.logo ? `<img class="mobile-slider-item-body-logo" src="${item.logo}" alt="logo">` : ''}
            </div>
            <div class="mobile-slider-item-content">
              <h4>${item.type}</h4>
              <a href="${item.url}">
                <h2>${title}</h2>
              </a>
            </div>
         </div>
      `)

    if(item.video){
      const videoPropagationMobile = $el(`#${videoID}`);
      const video = $el(`#${videoID}`).querySelector('video');
      const playIcon = videoPropagationMobile.querySelector('.video-propagation-mobile');

      const mobileSliderVideoVolume = $el('.mobile-slider-video-volume');

      playIcon.addEventListener('click', (e) => {
        if (video.paused) {
          showProjectsMobile.style.opacity = '0';
          video.play();
          playIcon.innerHTML = `<i class="icon-pause"></i>`;
        } else {
          showProjectsMobile.style.opacity = '1';
          video.pause();
          playIcon.innerHTML = `<i class="icon-play"></i>`;
        }
      })


      mobileSliderVideoVolume.addEventListener('click', function (){

        const videoBlock = $el(`#video__${activeMobileSlider} video`);

        if(videoBlock.muted){
          videoBlock.muted = false;
          mobileSliderVideoVolume.innerText = 'SOUND OFF';
        } else {
          videoBlock.muted = true;
          mobileSliderVideoVolume.innerText = 'SOUND ON';
        }
      })

      const showProjectsMobile = $el('.show-projects-mobile');

      showProjectsMobile.addEventListener('click', function (){
        percentMobile = 99;

        // activeMobileSlider += 1;

        sliderX = -(window.innerWidth + _gap) * activeMobileSlider;

        // changeActiveHashtagsMobile();
        //
        // AnimationSliderMobile();

        intMobile = startMobileAutoLoadingSlider();

      })

    }


  });




//



//
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

  setTimeout(() => {
    startProgress();
  }, 7000)


  let status = false;
  sliderContentButtonsPlay?.addEventListener('click', function () {
    const items = $('.slider-content-item')[sliderActiveIndex];
    const id = sliderContentButtonsPrev.dataset.active;

    const getActiveItem = $el(`#${id}`);

    if (status) {
      if (percent) {
        int = startAutoLoadingSlider();
      }
      sliderContentButtonsPlay.classList.remove(active);
      sliderContentButtonsPrev.querySelector('i').style.transform = 'rotate(0deg)';
      sliderContentButtonsNext.querySelector('i').style.transform = 'rotate(0deg)';
      document.body.classList.add('active-slider')
      getActiveItem.classList.remove(active);
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
  sliderContentButtonsPrev?.addEventListener('click', function () {


    if (sliderContentButtonsPlay.classList.contains(active)) {

      sliderActiveIndex -= 1;

      if (sliderActiveIndex === 0) {
        sliderActiveIndex = sliderInfo.length - 1;
      }
      const getItem = $el('.slider-content-item');
      const info = getItem.getBoundingClientRect().height * sliderActiveIndex + 1;
      sliderContentInfoContent.scrollTo({
        top: info,
        left: 0,
        behavior: "smooth",
      })

    } else {
      if (successClickNextPrev > 1) {
        console.warn('user click fast prev button')
      } else if (successClickNextPrev === 1) {

        sliderActiveIndex -= 1;

        if (sliderActiveIndex < 0) {
          sliderActiveIndex = sliderInfo.length - 1;
        }

        percent = 0;
        progressBar?.setAttribute('style', `--percent: 0%`);
        clearInterval(int);

        nextAnimation(false)

        setTimeout(() => {
          startNextAnimation(false)
        }, 500)

        successClickNextPrev += 1;
      }
    }


  })


// NEXT SLIDER FUNCTION
  sliderContentButtonsNext?.addEventListener('click', function () {

    if (sliderContentButtonsPlay.classList.contains(active)) {
      sliderActiveIndex += 1;

      if (sliderActiveIndex === sliderInfo.length) {
        sliderActiveIndex = 0;
      }
      const getItem = $el('.slider-content-item');
      const info = getItem.getBoundingClientRect().height * sliderActiveIndex + 1;
      sliderContentInfoContent.scrollTo({
        top: info,
        left: 0,
        behavior: "smooth",
      })

    } else {
      if (successClickNextPrev > 1) {
        console.warn('user click fast next button')
      } else if (successClickNextPrev === 1) {

        sliderActiveIndex += 1;

        if (sliderActiveIndex > sliderInfo.length - 1) {
          sliderActiveIndex = 0;
        }

        percent = 0;
        progressBar?.setAttribute('style', `--percent: 0%`);
        clearInterval(int);

        nextAnimation(true)

        setTimeout(() => {
          startNextAnimation(true)
        }, 500)
        successClickNextPrev += 1;

      }
    }


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

            img.style.transform = `scale(${calc})`;

            // title.style.transform = `scale(${calc})`;
            title.style.left = `${obj.textLeftPercent + titleLeft}%`;
            // title.style.top = `${30 + top}%`;

            // type.style.transform = `scale(${calc})`;
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

  let successClickImage = true;
  const sliderContentItemImg = $('.slider-content-item img');

  sliderContentItemImg.forEach((item, index) => {
    item?.addEventListener('click', function () {
      if(successClickImage){
        successClickImage = false;

        sliderActiveIndex = index;
        percent = 0;
        progressBar?.setAttribute('style', `--percent: 0%`);
        sliderContentButtonsPlay.classList.remove(active);
        sliderContentButtonsPrev.querySelector('i').style.transform = 'rotate(0deg)';
        sliderContentButtonsNext.querySelector('i').style.transform = 'rotate(0deg)';
        document.body.classList.add('active-slider')
        startNextAnimation(true)

        setTimeout(() => {
          successClickImage = true;
        }, 3000)
      }
    })
  })


  function startAutoLoadingSlider() {
    return setInterval(() => {
      percent += 1;
      progressBar?.setAttribute('style', `--percent: ${percent}%`);

      if (percent === 5) {
        startNextAnimation(true)
      }

      if (percent === 99) {
        nextAnimation(true)
      }

      if (percent === 100) {
        percent = 0;
        sliderActiveIndex += 1;


        if (sliderActiveIndex === sliderInfo.length) {
          sliderActiveIndex = 0;
        }
      }
    }, 100)
  }


  const animationContent = $el('.animation-content');
  const footerHashtagsItem = $('.footer-hashtags-item');


  footerHashtagsItem.forEach((item, index) => {
    item?.addEventListener('click', function () {

      if(document.body.classList.contains('active-slider')){
        percent = 0;
        progressBar?.setAttribute('style', `--percent: 0%`);
        clearInterval(int);

        if (index < sliderActiveIndex) {
          const hashtag = item.dataset.hashtag;


          const findIndex = sliderInfo.findIndex((_sl) => _sl.hashtag === hashtag);
          if(findIndex >= 0){
            sliderActiveIndex = findIndex

            nextAnimation(false);

            setTimeout(() => {
              startNextAnimation(false)
            }, 500)
          }

        } else {
          const hashtag = item.dataset.hashtag;

          const findIndex = sliderInfo.findIndex((_sl) => _sl.hashtag === hashtag);
          if(findIndex >= 0){
            sliderActiveIndex = findIndex;

            nextAnimation(true);

            setTimeout(() => {
              startNextAnimation(true)
            }, 500)
          }
        }
      } else {
        const getHashtag = item.dataset.hashtag;
        const getElem = $el(`[data-typehashtag="${getHashtag}"]`);
        const top = getElem.offsetTop;

        sliderContentInfoContent.scrollTo({
          top: top,
          left: 0,
          behavior: "smooth",
        })
      }
    })
  })

  let successClickOpenPage = false;
  function startNextAnimation(status) {

    const getActiveInfo = sliderInfo[sliderActiveIndex];
    const randomId = `torgomyan01_${Math.floor(Math.random() * 1000)}`;

    const title = getActiveInfo.title.split('|').map((item, index) => `<span style="transition-delay: 1.${index * 3}s;">${item}</span> <br />`).join('')


    setTimeout(() => {
      footerHashtagsItem.forEach((item) => item.classList.remove(active))

      const getHashtag = $(`[data-hashtag="${getActiveInfo.hashtag}"]`);

      getHashtag.forEach((item) => {
        item.classList.add(active)
      })

    }, 1000)

    sliderContentButtonsPrev?.setAttribute('data-active', randomId);

    animationContent.insertAdjacentHTML('beforeend', `
      <div class="slider-content-max ${getActiveInfo.video ? 'video-have' : ''}" id="${randomId}" style="top: ${status ? '100vh' : 'calc(-100vh - 130px)'}">
      
        ${getActiveInfo.video ? `
          <video width="100%" height="100%" autoplay muted loop class="slider-content-img slider-content-max-img" id="video-block">
            <source src="${getActiveInfo.video}" type="video/mp4">
          </video>
          
          <div class="video-propagation">
            <i class="icon-pause"></i>
          </div>
          
          <button class="show-projects">Show projects</button>
          
        ` : `
          <img src="${getActiveInfo.img}" class="slider-content-img slider-content-max-img" onclick="openPage('${getActiveInfo.url}')" alt="slider" width="1560" height="884">
        `}
         <h2 class="slider-content-max-title" onclick="openPage('${getActiveInfo.url}')">
           <b class="type">${getActiveInfo.type}</b>
           ${title}
         </h2>
        ${getActiveInfo.logo ? `<img class="slider-content-max-logo" src="${getActiveInfo.logo}" alt="logo">` : ''}
      </div>
    `);

    successClickOpenPage = false;
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

  let startedAnimationStatus = true;

  function getCenterActiveElem(randomId) {
    const sliderContentMax = $el(`#${randomId}`);
    const sliderContentMaxOffset = sliderContentMax.getBoundingClientRect();


    sliderContentMax.style.transition = `0.3s`;
    sliderContentMax.style.left = `-${sliderContentMaxOffset.left}px`;
    sliderContentMax.style.width = `${window.innerWidth}px`;
    sliderContentMax.style.height = `${window.innerHeight}px`;
    //
    setTimeout(() => {
      sliderContentMax.style.top = `-7.625rem`;

      const getActiveInfo = sliderInfo[sliderActiveIndex];

      if (getActiveInfo.video) {
        const getVideo = $el('#video-block');
        const videoPropagation = $el('.video-propagation');
        const videoHave = $el('.video-have');
        const showProjects = $el('.show-projects');

        const footerHashtags = $el('.footer-hashtags');
        const footerVideoStatus = $el('.footer-video-status');

        footerVideoStatus.innerText = 'SOUND ON';

        footerHashtags.style.display = 'none';
        footerVideoStatus.style.display = 'block';

        showProjects.style.display = 'none';

        showProjects.addEventListener('click', function (){
          showProjects.style.display = 'none';
          percent = 95;
          NextProcess();

          // sliderActiveIndex += 1;

          // startNextAnimation(true)
          //
          // nextAnimation(true)

          footerHashtags.style.display = 'block';
          footerVideoStatus.style.display = 'none';

          int = startAutoLoadingSlider();

        })

        footerVideoStatus.addEventListener('click', function(){
          if(getVideo.muted){
            getVideo.muted = false;
            footerVideoStatus.innerText = 'SOUND OFF';
          } else {
            getVideo.muted = true;
            footerVideoStatus.innerText = 'SOUND ON';
          }
        })

        videoPropagation.addEventListener('click', function () {
          if (getVideo.paused) {
            getVideo.play();
            videoPropagation.innerHTML = `<i class="icon-pause"></i>`;
            showProjects.style.display = 'none';
          } else {
            getVideo.pause();
            videoPropagation.innerHTML = `<i class="icon-play"></i>`;
            showProjects.style.display = 'block';
          }
        });

        let pauseView;

        videoHave.addEventListener('mousemove', function () {
          videoPropagation.style.opacity = '1';

          clearTimeout(pauseView);

          pauseView = setTimeout(() => {
            videoPropagation.style.opacity = '0';
          }, 2000);
        });

        // Օրինակ՝ եթե ուզում ես 3 վայրկյանից հետո pause անել
        // setTimeout(() => {
        //   getVideo.pause();
        // }, 3000);

        // Եթե ուզում ես հեռացնել interval ինչ-որ տեղից
        clearInterval(int); // համոզվիր որ `int` արժեքը սահմանված է
      } else {
        setTimeout(() =>  NextProcess(), startedAnimationStatus ? 3500 : 1500)
      }

      function NextProcess(){
        sliderContentMax.style.left = `0`;
        sliderContentMax.style.top = `0`;
        sliderContentMax.style.width = `calc(100% - 12.5rem)`;
        sliderContentMax.style.height = `${printHeight(sliderContentMaxOffset.height)}px`;
        sliderContentMax.classList.add(show)

        successClickNextPrev = 1;

        startedAnimationStatus = false;
        setTimeout(() => {
          successClickOpenPage = true;
        }, 800)
      }




      sliderContentMax.style.transition = `0.8s`;
    }, 500)
  }


  function openPage(url){
    if(successClickOpenPage){
      // console.log(url)
      window.open(url, '_top')
    }
  }



  const sliderContentMaxTitle = $('.slider-content-item-title');

  sliderContentMaxTitle.forEach((item) => {
    const getBr = item.querySelectorAll('br');


    if(getBr.length === 3){
      getBr[0].outerHTML = '&nbsp;&nbsp;';
    }

  })



// --------------------------------------------------------
// ------------------- MOBILE VERSION ---------------------
// --------------------------------------------------------

  let SBWidth = 0;
  const _sliderItems = $('.mobile-slider-item');

  window.addEventListener('resize', function (){
    startCalcSliderWidth();
    nextMobileSlider();
  })

  startCalcSliderWidth()


  function startCalcSliderWidth(){
    const mobileSliderBody = $el('.mobile-slider-body');
    const mobileSliderItem = _sliderItems;

    if(mobileSliderBody){
      SBWidth = (window.innerWidth * mobileSliderItem.length) + ((mobileSliderItem.length - 1) * 17) - window.innerWidth

      mobileSliderBody.style.width = `${SBWidth}px`;
    }
  }



  const mobileSlider = $el('.mobile-slider');
  const mobileSliderBody = $el('.mobile-slider-body');
  const mobileSliderHashtagsItem  = $('.mobile-slider-hashtags-item');
  const progressBarMobile = $el('.progress-bar-mobile');
  let percentMobile = 0;
  let intMobile;

  let activeMobileSlider = 0;
  const _gap = 17;
  let sliderX = 0;
  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;


  mobileSlider?.addEventListener('touchstart', (event) => {
    const getActiveInfo = sliderInfo[activeMobileSlider];

    if(!getActiveInfo.video){
      const touch = event.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }

  });

  mobileSlider?.addEventListener('touchend', (event) => {
    const getActiveInfo = sliderInfo[activeMobileSlider];

    if(!getActiveInfo.video){
      const touch = event.changedTouches[0];
      endX = touch.clientX;
      endY = touch.clientY;

      handleSwipe();
    }
  });

  function handleSwipe() {
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 50) {
        prevMobileSlider()
      } else if (deltaX < -50) {
        nextMobileSlider()
      }
    }
  }


  function nextMobileSlider(){
    activeMobileSlider += 1;
    sliderX -= window.innerWidth + _gap;


    if(sliderX < -SBWidth){
      sliderX = 0 ;
    }

    if (activeMobileSlider > sliderInfo.length - 1) {
      activeMobileSlider = 0;
    }


    changeActiveHashtagsMobile()

    AnimationSliderMobile();
  }

  function prevMobileSlider(){
    activeMobileSlider -= 1;

    if (activeMobileSlider < 0) {
      activeMobileSlider = sliderInfo.length - 1;
    }

    sliderX = -(window.innerWidth + _gap) * activeMobileSlider;

    changeActiveHashtagsMobile();

    AnimationSliderMobile();



  }


  function AnimationSliderMobile(){
    mobileSlider.classList.add('scale')

    setTimeout(() => {
      mobileSliderBody.style.transform = `translateX(${sliderX}px)`;

      setTimeout(() => {
        percentMobile = 0;
        progressBarMobile.setAttribute('style', `--percentMobile: ${percentMobile}%`);

        mobileSliderBody.style.transform = `translateX(${sliderX}px)`;

        mobileSlider.classList.remove('scale')
      }, 1000)
    }, 300)
  }


  function changeActiveHashtagsMobile(){
    mobileSliderHashtagsItem.forEach((item) => {
      item.classList.remove(active);
    })

    const getActiveInfo = sliderInfo[activeMobileSlider];
    const getHashtag = $(`[data-hashtagmobile="${getActiveInfo.hashtag}"]`);

    getHashtag.forEach((item) => {
      item.classList.add(active)
    })
  }

  mobileSliderHashtagsItem.forEach((item, index) => {
    item?.addEventListener('click', function (){
      const hashtag = item.dataset.hashtagmobile;
      const findIndex = sliderInfo.findIndex((_sl) => _sl.hashtag === hashtag);

      if(findIndex >= 0){
        percentMobile = 0;
        activeMobileSlider = findIndex;

        sliderX = -(window.innerWidth + _gap) * activeMobileSlider;

        changeActiveHashtagsMobile();

        AnimationSliderMobile();
      }
    })
  })


  setTimeout(() => {
    startMobileSlidingProcess()
    changeActiveHashtagsMobile()
  }, 10000)

  function startMobileSlidingProcess(){
    intMobile = startMobileAutoLoadingSlider();
  }

  setInterval(() => {
    CheckActiveSliderMobile()
  }, 500)

  let activeI = -1;

  function CheckActiveSliderMobile(){
    const activeItem = sliderInfo[activeMobileSlider];
    if(activeItem.video){
      clearInterval(intMobile);
    }

    if(activeI !== activeMobileSlider){
      activeI = activeMobileSlider

      const mobileSliderItemContent = $('.mobile-slider-item-content');
      const mobileSliderVideoVolume = $el('.mobile-slider-video-volume');
      const showProjectsMobileParent = $el('.show-projects-mobile-parent');
      const videoPropagationMobile = $el('.video-propagation-mobile');

      const getVideo = $el(`#video__${activeMobileSlider} video`);
      const mobile = $el('.mobile');


      showProjectsMobileParent.querySelector('button').style.opacity = '0';

      if(activeItem.video){
        const mobileHeight = (window.innerHeight - mobile.getBoundingClientRect().height) / 2;
        mobile.style.marginTop = `${mobileHeight}px`;

        mobileSliderHashtags.style.display = 'none';
        mobileButtons.style.display = 'none';
        mobileSliderVideoVolume.style.display = 'flex';
        showProjectsMobileParent.style.display = 'flex';

        mobileSliderItemContent.forEach((item) => {
          item.style.display = 'none';
        })

        setTimeout(() => {
          getVideo.play()
        }, 100)

        videoPropagationMobile.innerHTML = '<i class="icon-pause"></i>';

      } else {
        mobileSliderHashtags.style.display = 'block';
        mobileButtons.style.display = 'flex';
        mobileSliderVideoVolume.style.display = 'none';
        showProjectsMobileParent.style.display = 'none';

        mobileSliderItemContent.forEach((item) => {
          item.style.display = 'block';
        })
        mobile.style.marginTop = '0';
      }
    }

  }

  function startMobileAutoLoadingSlider() {
    return setInterval(() => {

      const activeItem = sliderInfo[activeMobileSlider];

      percentMobile += 1;

      console.log(percentMobile)
      progressBarMobile.setAttribute('style', `--percentMobile: ${percentMobile}%`);

      if (percentMobile === 100) {

        percentMobile = 0;
        activeMobileSlider += 1;

        if (activeMobileSlider === sliderInfo.length) {
          activeMobileSlider = 0;
        }

        sliderX = -(window.innerWidth + _gap) * activeMobileSlider;

        changeActiveHashtagsMobile();

        AnimationSliderMobile();


      }
    }, 100)
  }


  const mobileButtons = $el('.mobile-buttons');
  const mobileButtonsNext = $el('.mobile-buttons-next');
  const mobileButtonsPrev = $el('.mobile-buttons-prev');

  mobileButtonsNext?.addEventListener('click', function (){
    progressBarMobile.setAttribute('style', `--percentMobile: 0%`);

    clearInterval(intMobile)

    nextMobileSlider();

  })

  mobileButtonsPrev?.addEventListener('click', function (){
    progressBarMobile.setAttribute('style', `--percentMobile: 0%`);

    clearInterval(intMobile)

    prevMobileSlider();
  })

}


if (document.body.dataset.page === 'studio'){

  AOS.init()



  const playVideoStudio = $el('.hero-video-play');
  const modalToVideo = $el('.modal-to-video');
  const modalToVideoClose = $el('.modal-to-video-close');

  const player = videojs('my-video');

  playVideoStudio.addEventListener('click', function (){
    modalToVideo.classList.add('active');
    document.body.style.overflow = 'hidden';


    setTimeout(() => {
      modalToVideo.querySelector('.video-js').style.opacity = '1';
      player.play();
    }, 500)
  })

  modalToVideoClose.addEventListener('click', function (){
    modalToVideo.querySelector('.video-js').style.opacity = '0';
    player.pause();
    player.currentTime(0);


    setTimeout(() => {
      document.body.style.overflow = 'auto';
      modalToVideo.classList.remove('active');
    }, 500)
  })


  window.onload = () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      startAnimLoadingPge()
    }, 100)
  }

  function startAnimLoadingPge(){

    const ownersNames = $('.owners-names');
    const ownersImagesOwner = $('.owners-images-owner img');

    ownersImagesOwner.forEach((item) => {
      item.addEventListener('mouseenter', function (){
        const id = +item.dataset.id;

        ownersNames.forEach((owners) => {
          owners.classList.remove(active);
        })

        Array.from(ownersNames[id].children).forEach((child) => {
          child.style.transitionDelay = '0s';
        });
        ownersNames[id].classList.add(active)

      })
    })

    ownersImagesOwner.forEach((item, index) => {
      item.addEventListener('mouseout', function (){
        ownersNames.forEach((owners) => {
          owners.classList.remove(active);
        })
      })
    })



    // window.addEventListener('resize', function (){
    //   animationStudio()
    // })

    // const heroTitle = $el('.hero-title');
    // const studioAnim = $el('.studio-anim');
    const studioAnimItems = $('.studio-anim span');
    const heroVideo = $el('.hero-video');
    const heroVideoPlay = $el('.hero-video-play');
    // const heroTitlePos = heroTitle.getBoundingClientRect();
    const animText = $('.anim-text');


    // function animationStudio(){
    //   const heroTitle = $el('.hero-title');
    //   const studioAnim = $el('.studio-anim');
    //   const heroTitlePos = heroTitle.getBoundingClientRect();
    //
    //   studioAnim.style.left = `${heroTitlePos.x}px`;
    //   studioAnim.style.top = `${heroTitlePos.y + 3}px`;
    //   studioAnim.style.fontSize = `2.625rem`;
    //   studioAnim.style.letterSpacing = `-5.4px`;
    //   studioAnim.style.transform = `translateX(0)`;
    //   studioAnim.style.transition = `0s`;
    // }


    studioAnimItems.forEach((item) => {
      item.classList.add(active)

      setTimeout(() => {
        item.style.transitionDelay = '0s';
      }, 300)
    })

    setTimeout(() => {
      heroVideo.style.width = window.innerWidth > 768 ? '100%' : 'calc(100% + 40px)';
      document.body.style.overflow = 'auto';
      // studioAnim.style.position = `absolute`;

      setTimeout(() => {
        heroVideoPlay.style.opacity = '1';

      }, 1000)
    }, 1000)


    setTimeout(() => {
      animText.forEach((item) => {
        item.classList.add(active);
      })
    }, 1500)
  }


  const partnersItem = gsap.utils.toArray(".partners-item");
  function getRandomDuration(min, max) {
    return Math.random() * (max - min) + min; // Պատահական թիվ [min, max] տիրույթում
  }

  partnersItem.forEach((item) => {
    const logos = Array.from(item.children);

    Array.from({length: 10}).forEach(() => {
      const clonedLogos = logos.map((logo) => logo.cloneNode(true));
      clonedLogos.forEach((clone) => item.appendChild(clone));
    })


    const randomDuration = getRandomDuration(130, 180);

    const images = item.querySelectorAll('img');

    const totalWidth = images.length * 200

    gsap.to(item, {
      x: -totalWidth,
      duration: randomDuration,
      ease: "none",
      repeat: -1
    });
  })

}



if (document.body.dataset.page === 'projects'){
  AOS.init();
  let XPositionSlider = 0;
  let activeItem = 0;

  const projectsSliderBody = $el('.projects-slider-body');
  const container = $el('.container');
  const containerInfo = container.getBoundingClientRect();

  const logos = Array.from(projectsSliderBody.children);

  Array.from({length: 10}).forEach(() => {
    const clonedLogos = logos.map((logo) => logo.cloneNode(true));
    clonedLogos.forEach((clone) => projectsSliderBody.appendChild(clone));
  })

  const projectsSliderBodyItem = $('.projects-slider-body-item');
  const defWindowCont = (window.innerWidth - containerInfo.width) / 2;
  const partContainer = containerInfo.width / 2;

  projectsSliderBodyItem.forEach((item) => {
    item.style.width = `${partContainer}px`;
    item.style.minWidth = `${partContainer}px`;
  })
  XPositionSlider = defWindowCont;

  projectsSliderBody.style.transform = `translateX(${XPositionSlider}px)`;
  projectsSliderBodyItem[activeItem].classList.add(active);

  const intSlider = setInterval(() => {
    changeSlider('next');
  }, 3000)

  function changeSlider(type){
    if(type === 'next'){
      activeItem += 1;
      XPositionSlider = (XPositionSlider - partContainer) - 8;

      if(activeItem > projectsSliderBodyItem.length - 1){
        XPositionSlider = 0;
        activeItem = 0;
      }

    } else if(type === 'prev') {
      activeItem -= 1;
      XPositionSlider = (XPositionSlider + partContainer) - (activeItem * 8);

      if(activeItem < 0){
        XPositionSlider = defWindowCont
        activeItem = 0;
      }
    }

    projectsSliderBodyItem.forEach((item) => item.classList.remove(active));
    projectsSliderBodyItem[activeItem].classList.add(active);


    projectsSliderBody.style.transform = `translateX(${XPositionSlider}px)`;
  }



  const dataMove = $('[data-move]');
  const userDirection = $el('.user-direction');
  const modalClose = $el('.modal-close');
  const gallery = document.querySelector('.gallery');
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modalImage');
  const imageOldPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  }

  dataMove.forEach((item) => {
    const Text = item.dataset.move;
    item.addEventListener('mouseenter', function (){
      userDirection.style.opacity = '1';
      userDirection.innerText = Text;
    })
    item.addEventListener('mouseleave', function (){
      userDirection.style.opacity = '0';
    })

    if(Text === 'View'){
      item.addEventListener('click', function (e){

        if(window.innerWidth > 767){
          document.body.style.overflow = 'hidden';
          const rect = e.target.getBoundingClientRect();
          modalImage.src = e.target.src;
          modal.style.display = 'flex';

          imageOldPosition.x = rect.x;
          imageOldPosition.y = rect.y;
          imageOldPosition.width = rect.width;
          imageOldPosition.height = rect.height;

          modalImage.style.left = `${rect.x}px`;
          modalImage.style.top = `${rect.y}px`;

          modalImage.style.width = `${rect.width}px`;
          modalImage.style.height = `${rect.height}px`;

          const img = new Image();
          img.src = e.target.src;

          modalImage.style.transition = `1s`;

          const width = () => {

            if(img.naturalHeight > window.innerHeight){
              const percentageDifference = img.naturalWidth * 100 / img.naturalHeight;
              return ((img.naturalWidth * percentageDifference) / 100);
            } else {
              return img.naturalWidth > window.innerWidth ? window.innerWidth : img.naturalWidth;
            }


          };
          const height = img.naturalHeight > window.innerHeight ? window.innerHeight : img.naturalHeight;

          img.onload = () => {
            setTimeout(() => {
              modalImage.style.left = `50%`;
              modalImage.style.top = `50%`;
              modalImage.style.transform = `translate(-50%, -50%)`;
              modalImage.style.width = `${width()}px`;
              modalImage.style.height = `${height}px`;
            }, 200)
          }
        }
      })
    }

  })

  modalClose.addEventListener('click', () => {
    modalImage.style.transform = 'translate(0, 0)';
    modalImage.style.left = `${imageOldPosition.x}px`;
    modalImage.style.top = `${imageOldPosition.y}px`;
    modalImage.style.width = `${imageOldPosition.width > window.innerWidth ? window.innerWidth : imageOldPosition.width }px`;
    modalImage.style.height = `${imageOldPosition.height > window.innerHeight ? window.innerHeight : imageOldPosition.height}px`;

    modalImage.addEventListener('transitionend', () => {
      modal.style.display = 'none';
      modalImage.style.transition = '';
      document.body.style.overflow = null;
    }, { once: true });
  });

  window.addEventListener('mousemove', function (e){
    const x = e.x;
    const y = e.y;

    userDirection.style.left = `${x}px`;
    userDirection.style.top = `${y}px`;
  })

}





if (document.body.dataset.page === '404'){
  const empty = $el('.empty');
  const notFoundLogo = $el('.pnf-container-body .nf');
  const pnfContainerBodyInfo = $el('.pnf-container-body-info');
  const container = $el('.container').getBoundingClientRect();
  const pnfContainerBodyInfoIngo = pnfContainerBodyInfo.getBoundingClientRect();

  const windowContainerDeference = (window.innerWidth - container.width) / 2;


  if(window.innerWidth > 768){
    notFoundLogo.style.transition = '2s';

    setTimeout(()=>{
      notFoundLogo.style.opacity = '1';


      setTimeout(()=>{
        notFoundLogo.style.maxWidth = '613px';
        notFoundLogo.style.left = `${pnfContainerBodyInfoIngo.left - windowContainerDeference}px`;
        notFoundLogo.style.transform = `translateY(16%)`;


        setTimeout(()=>{
          notFoundLogo.style.transition = `0s`;
          notFoundLogo.style.transitionDelay = `0s`;

          [...pnfContainerBodyInfo.children].forEach((item) => {
            item.classList.add('active');
          })
          empty.classList.add('active');
        }, 2000)
      }, 2000)
    }, 500)


    window.addEventListener('resize', ()=>{
      const container = $el('.container').getBoundingClientRect();
      const notFoundLogo = $el('.pnf-container-body .nf');
      const pnfContainerBodyInfo = $el('.pnf-container-body-info');
      const pnfContainerBodyInfoIngo = pnfContainerBodyInfo.getBoundingClientRect();

      const windowContainerDeference = (window.innerWidth - container.width) / 2;

      notFoundLogo.style.left = `${pnfContainerBodyInfoIngo.left - windowContainerDeference}px`;
    })

  } else {
    notFoundLogo.style.transition = '2s';


    setTimeout(()=>{
      notFoundLogo.style.opacity = '1';

      setTimeout(() => {
        notFoundLogo.style.transform = 'translateY(10%)';

        setTimeout(()=>{
          notFoundLogo.style.transition = `0s`;
          notFoundLogo.style.transitionDelay = `0s`;

          [...pnfContainerBodyInfo.children].forEach((item) => {
            item.classList.add('active');
          })
          empty.classList.add('active');
        }, 2000)

      }, 2000)
    }, 500)
  }







}