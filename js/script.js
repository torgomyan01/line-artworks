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

const PrintSliderItem = (item, _index) => `<span style="transition-delay: 1.${_index * 2}s">${item}</span>`;
const PrintSliderBody = (titlesItem, index) => `<h2 class="slider-content-info-title ${index === 0 ? 'active' : ''}">${titlesItem}</h2>`;
const PrintHashtagItem = (item, index) => `<span class="footer-hashtags-item ${index === 0 ? 'active' : ''}">#${item.hashtag}</span>`;

const getTitlesItems = (str) => str.split('|');

sliderInfo.forEach((item, index) => {
  const titlesItem = getTitlesItems(item.title).map((item, _index) => PrintSliderItem(item, _index)).join('');

  footerHashtags.insertAdjacentHTML('beforeend', PrintHashtagItem(item, index))

  // sliderContentInfoBody.insertAdjacentHTML('beforeend', PrintSliderBody(titlesItem, index))

  // changeSliderActive();
});
//

//
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

function startProgress(){
  int = startAutoLoadingSlider();
}

startProgress();

//
function startAutoLoadingSlider(){
  return setInterval(() => {
    percent += 1;
    progressBar.setAttribute('style', `--percent: ${percent}%`);

    if(percent === 100){
      percent = 0;
      sliderActiveIndex += 1;

      if(sliderActiveIndex === sliderInfo.length - 1){
        sliderActiveIndex = 0;
      }
    }
  }, 50)
}




let status = false;
sliderContentButtonsPlay.addEventListener('click', function (){
  if(status){
    int = startAutoLoadingSlider();
    sliderContentButtonsPlay.classList.remove(active)
  } else {
    clearInterval(int);
    sliderContentButtonsPlay.classList.add(active)
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
//
// // NEXT SLIDER FUNCTION
// sliderContentButtonsNext.addEventListener('click', function (){
//   sliderActiveIndex += 1;
//   percent = 0;
//
//   if(sliderActiveIndex === sliderInfo.length - 1){
//     sliderActiveIndex = 0;
//   }
//   nextSlider()
// })
//
//
//


const sliderItems = gsap.utils.toArray(".slider-content-item");
const sliderContentInfoContent = $el('.slider-content-info-content');


sliderItems.forEach((item) => {
  gsap.fromTo(item,
    {scale: 1}, // Սկսում ենք փոքր չափից
    {
      scrollTrigger: {
        trigger: item,
        scroller: sliderContentInfoContent, // օգտագործում ենք ծնողի սքրոլը
        start: 'top top-=-60%',    // երբ էլեմենտը հայտնվի 80% դիրքում
        end: 'top top-=-10%',      // մինչև այն հասնի 20% դիրքի
        scrub: true,         // սահուն մեծացում սքրոլի հետ
        markers: false,        // ցուցադրում ենք սկիզբն ու վերջը, որ տեսնենք սահմանները
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
  item.addEventListener('click', function (){
    sliderContentItemImg.forEach((elem) => {
      elem.parentElement.classList.remove(active);
    })
    sliderContentInfo.classList.add(active);
    sliderContent.classList.remove(active)
    footer.classList.remove(active)
    item.parentElement.classList.add(active);


    sliderContentItemImg.forEach((elem) => {
      if(!elem.parentElement.classList.contains(active)){
        elem.parentElement.style.opacity = '0';
      }
    })
  })
})


// ------------------------------
// ----------- MENU--------------
// ------------------------------

const navMenu = $el('.nav-menu');

navMenu.addEventListener('click', function () {
  navMenu.classList.toggle(active)
})

