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
  video: 'Video',
  production: 'Production',
  aviation: 'Aviation',
  construction: 'Construction',
  people: 'People',
}

const sliderInfo = [
  {
    type: 'Emirates <br> Global Aluminium',
    title: 'Women|in Heavy|Industry',
    img: 'images/slider-image-1.png',
    hashtag: hashtags.production
  },
  {
    type: 'Air Samarkand',
    title: 'New Airline|of Uzbekistan',
    img: 'images/slider-image-2.png',
    hashtag: hashtags.aviation
  },
  {
    type: 'AGC Glass',
    title: 'Industrial|photoshop|for Agc Glass',
    img: 'images/slider-image-3.png',
    hashtag: hashtags.construction
  },
  {
    type: 'EuroChem Group AG',
    title: 'Image|photoshoot ',
    img: 'images/slider-image-4.png',
    hashtag: hashtags.construction
  },
  {
    type: 'EMCO',
    title: 'Industrial|Photography|at Emco',
    img: 'images/slider-image-5.png',
    hashtag: hashtags.construction
  },
];





// ------------------------------
// ----------- MENU--------------
// ------------------------------

const navMenu = $el('.nav-menu');
const footerContact = $el('.footer-contact');
const menuItemContact = $el('.menu-item-contact');
const menuBackContact = $el('.menu-back-contact');
const menu = $el('.menu');
const nav = $el('.nav');
const menuRightLanguageItem = $('.menu-right-language-item');
const menuRightContent = $('.menu-right-content');

navMenu?.addEventListener('click', function () {
  if (navMenu.classList.contains(active)) {

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

footerContact?.addEventListener('click', function () {
  window.scrollTo(0, 0)
  navMenu.classList.add(active);
  menu.style.width = '100%';
  nav.style.backgroundColor = '#fff';

  setTimeout(() => {
    menu.classList.add(active);
    menu.querySelector('.menu-contact').classList.add(active);
  }, 1000)
})


menuItemContact?.addEventListener('click', function () {
  menu.querySelector('.menu-items').classList.remove(active);
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




if (document.body.dataset.page === 'home'){

  const footerHashtags = $el('.footer-hashtags');
  const sliderContentInfoContent = $el('.slider-content-info-content');
  const _mobileSliderBody = $el('.mobile-slider-body');
  const mobileSliderHashtags = $el('.mobile-slider-hashtags');

  const PrintHashtagItem = (item, index) => `<span class="footer-hashtags-item ${index === 0 ? 'active' : ''}" data-hashtag="${item}">#${item}</span>`;
  const PrintHashtagItemMobile = (item, index) => `<span class="mobile-slider-hashtags-item ${index === 0 ? 'active' : ''}" data-hashtag="${item}">#${item}</span>`;


  Object.values(hashtags).forEach((value, index) => {
    footerHashtags?.insertAdjacentHTML('beforeend', PrintHashtagItem(value, index))
    mobileSliderHashtags?.insertAdjacentHTML('beforeend', PrintHashtagItemMobile(value, index))
  })

  sliderInfo.forEach((item) => {
    const title = item.title.split('|').map((titleItem) => `<span>${titleItem}</span> <br />`).join('')

    sliderContentInfoContent?.insertAdjacentHTML('beforeend', `
    <div class="slider-content-item">
       <img src="${item.img}" class="${title}" alt="slider" width="1560" height="884">
       <h4 class="slider-content-item-type">${item.type}</h4>
       <h2 class="slider-content-item-title">${title}</h2>
    </div>
  `)


    _mobileSliderBody?.insertAdjacentHTML('beforeend', `
     <div class="mobile-slider-item">
        <img src="${item.img}" alt="${title}">
        <div class="mobile-slider-item-content">
          <h4>${item.type}</h4>
          <h2>${title}</h2>
        </div>
      </div>
  `)

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
  }, 9000)


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


        if (sliderActiveIndex === sliderInfo.length - 1) {
          sliderActiveIndex = 0;
        }
      }
    }, 100)
  }


  const animationContent = $el('.animation-content');
  const footerHashtagsItem = $('.footer-hashtags-item');


  footerHashtagsItem.forEach((item, index) => {
    item?.addEventListener('click', function () {
      percent = 0;
      progressBar?.setAttribute('style', `--percent: 0%`);
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

    const title = getActiveInfo.title.split('|').map((item, index) => `<span style="transition-delay: 1.${index * 3}s;">${item}</span> <br />`).join('')


    setTimeout(() => {
      footerHashtagsItem.forEach((item) => item.classList.remove(active))
      footerHashtagsItem[sliderActiveIndex].classList.add(active);
    }, 1000)

    sliderContentButtonsPrev?.setAttribute('data-active', randomId);


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

    setTimeout(() => {
      sliderContentMax.style.top = `-7.625rem`;

      setTimeout(() => {
        sliderContentMax.style.left = `0`;
        sliderContentMax.style.top = `0`;
        sliderContentMax.style.width = `calc(100% - 12.5rem)`;
        sliderContentMax.style.height = `${printHeight(sliderContentMaxOffset.height)}px`;
        sliderContentMax.classList.add(show)

        successClickNextPrev = 1;

        startedAnimationStatus = false;
      }, startedAnimationStatus ? 3500 : 1500)

      sliderContentMax.style.transition = `0.8s`;
    }, 500)
  }


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
  const mobileSliderHashtagsItem  = $('.mobile-slider-hashtags-item ');
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
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  });

  mobileSlider?.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    endX = touch.clientX;
    endY = touch.clientY;

    handleSwipe();
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
      sliderX = 0;
    }

    if (activeMobileSlider > sliderInfo.length - 1) {
      activeMobileSlider = 0;
    }


    changeActiveHashtagsMobile()

    AnimationSliderMobile();
  }

  function prevMobileSlider(){
    activeMobileSlider -= 1;
    sliderX += window.innerWidth + _gap;


    if(sliderX > -SBWidth){
      sliderX = 0;
    }

    if (activeMobileSlider < 0) {
      activeMobileSlider = 0;
    }


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

    mobileSliderHashtagsItem[activeMobileSlider].classList.add(active);
  }

  mobileSliderHashtagsItem.forEach((item, index) => {
    item?.addEventListener('click', function (){
      percentMobile = 0;
      activeMobileSlider = index;

      sliderX = -(window.innerWidth + _gap) * activeMobileSlider;

      changeActiveHashtagsMobile();

      AnimationSliderMobile();
    })
  })


  setTimeout(() => {
    startMobileSlidingProcess()
  }, 10000)

  function startMobileSlidingProcess(){
    intMobile = startMobileAutoLoadingSlider();
  }

  function startMobileAutoLoadingSlider() {
    return setInterval(() => {
      percentMobile += 1;
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


    window.addEventListener('resize', function (){
      animationStudio()
    })

    const heroTitle = $el('.hero-title');
    const studioAnim = $el('.studio-anim');
    const studioAnimItems = $('.studio-anim span');
    const heroVideo = $el('.hero-video');
    const heroVideoPlay = $el('.hero-video-play');
    const heroTitlePos = heroTitle.getBoundingClientRect();
    const animText = $('.anim-text');


    function animationStudio(){
      const heroTitle = $el('.hero-title');
      const studioAnim = $el('.studio-anim');
      const heroTitlePos = heroTitle.getBoundingClientRect();

      studioAnim.style.left = `${heroTitlePos.x}px`;
      studioAnim.style.top = `${heroTitlePos.y + 3}px`;
      studioAnim.style.fontSize = `2.625rem`;
      studioAnim.style.letterSpacing = `-5.4px`;
      studioAnim.style.transform = `translateX(0)`;
      studioAnim.style.transition = `0s`;
    }


    studioAnimItems.forEach((item) => {
      item.classList.add(active)

      setTimeout(() => {
        item.style.transitionDelay = '0s';
      }, 300)
    })

    setTimeout(() => {
      studioAnim.style.left = `${heroTitlePos.x}px`;
      studioAnim.style.top = `${heroTitlePos.y + 3}px`;
      studioAnim.style.fontSize = `2.625rem`;
      studioAnim.style.letterSpacing = `-5.4px`;
      studioAnim.style.transform = `translateX(0)`;


      setTimeout(() => {
        heroVideo.style.width = window.innerWidth > 768 ? '100%' : 'calc(100% + 40px)';
        document.body.style.overflow = 'auto';
        studioAnim.style.position = `absolute`;


        setTimeout(() => {
          heroVideoPlay.style.opacity = '1';

        }, 1000)
      }, 1000)

    }, 3000)


    setTimeout(() => {
      animText.forEach((item) => {
        item.classList.add(active);
      })
    }, 3000)
  }


  const partnersItem = gsap.utils.toArray(".partners-item");
  function getRandomDuration(min, max) {
    return Math.random() * (max - min) + min; // Պատահական թիվ [min, max] տիրույթում
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); // Գեներացնում է պատահական ինդեքս
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // Փոխանակում է տարրերը
    }
    return array;
  }

  partnersItem.forEach((item) => {
    const logos = Array.from(item.children);

    Array.from({length: 10}).forEach(() => {
      const clonedLogos = shuffleArray(logos.map((logo) => logo.cloneNode(true)));
      clonedLogos.forEach((clone) => item.appendChild(clone));
    })

    const totalWidth = item.scrollWidth / 2; // Ընդհանուր թրեքի երկարությունը

    const randomDuration = getRandomDuration(200, 250);

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
    changeSlider('next')
  }, 3000)

  function changeSlider(type){
    if(type === 'next'){
      activeItem += 1;
      XPositionSlider = XPositionSlider - partContainer;

      if(activeItem > projectsSliderBodyItem.length - 1){
        XPositionSlider = 0;
        activeItem = 0;
      }

    } else if(type === 'prev') {
      activeItem -= 1;
      XPositionSlider = XPositionSlider + partContainer;

      if(activeItem < 0){
        XPositionSlider = defWindowCont
        activeItem = 0;
      }
    }

    projectsSliderBodyItem.forEach((item) => item.classList.remove(active));
    projectsSliderBodyItem[activeItem].classList.add(active);


    projectsSliderBody.style.transform = `translateX(${XPositionSlider}px)`;
  }


  // HOVER TO NEXT
  const processSliderNext = $el('.process-slider-next');
  const processSliderNextInfo = $el('.process-slider-next-info');

  processSliderNext.addEventListener('mouseenter', NextHover)

  function NextHover(){
    const _elem = projectsSliderBodyItem[activeItem + 1];
    const imageUrl = _elem.querySelector('img').getAttribute('src');
    const type = _elem.dataset.type;
    const title = _elem.dataset.title;

    processSliderNextInfo.querySelector('img').setAttribute('src', imageUrl);
    processSliderNextInfo.querySelector('.process-slider-next-info-type').innerText = type;
    processSliderNextInfo.querySelector('.process-slider-next-info-title').innerText = title;

    processSliderNextInfo.classList.add(active);
  }

  processSliderNext.addEventListener('mouseout', function (){
    processSliderNextInfo.classList.remove(active);
  })

  processSliderNext.addEventListener('click', function (){
    clearInterval(intSlider)
    changeSlider('next');
    NextHover()
  })

  // HOVER TO PREV
  const processSliderPrev = $el('.process-slider-prev');
  const processSliderPrevInfo = $el('.process-slider-prev-info');

  processSliderPrev.addEventListener('mouseenter', prevHover);

  function prevHover(){
    const _elem = projectsSliderBodyItem[activeItem - 1 < 0 ? 0 : activeItem - 1];
    const imageUrl = _elem.querySelector('img').getAttribute('src');
    const type = _elem.dataset.type;
    const title = _elem.dataset.title;

    processSliderPrevInfo.querySelector('img').setAttribute('src', imageUrl);
    processSliderPrevInfo.querySelector('.process-slider-prev-info-type').innerText = type;
    processSliderPrevInfo.querySelector('.process-slider-prev-info-title').innerText = title;

    processSliderPrevInfo.classList.add(active);
  }

  processSliderPrev.addEventListener('mouseout', function (){
    processSliderPrevInfo.classList.remove(active)
  })
  processSliderPrev.addEventListener('click', function (){
    clearInterval(intSlider)
    changeSlider('prev');
    prevHover()
  })

}