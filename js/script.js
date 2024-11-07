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

function $el(name){
  return document.querySelector(name);
}

function $(name){
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
const sliderContentInfoBody = $el('.slider-content-info-body');
const sliderContentImage = $el('.slider-content-image');
const sliderContentInfoType = $el('.slider-content-info-type');

const PrintSliderItem = (item,_index) => `<span style="transition-delay: 1.${_index * 2}s">${item}</span>`;
const PrintSliderBody = (titlesItem, index) => `<h2 class="slider-content-info-title ${index === 0 ? 'active' : ''}">${titlesItem}</h2>`;
const PrintHashtagItem = (item, index) => `<span class="footer-hashtags-item ${index === 0 ? 'active' : ''}">#${item.hashtag}</span>`;

const getTitlesItems = (str) => str.split('|');

sliderInfo.forEach((item, index) => {
  const titlesItem = getTitlesItems(item.title).map((item, _index) => PrintSliderItem(item, _index)).join('');

  footerHashtags.insertAdjacentHTML('beforeend', PrintHashtagItem(item, index))

  sliderContentInfoBody.insertAdjacentHTML('beforeend', PrintSliderBody(titlesItem, index))

  changeSliderActive();
});

const sliderContentImageInfo = sliderContentImage.getBoundingClientRect();

const imageInfo = {
  width: sliderContentImageInfo.width,
  height: sliderContentImageInfo.height
}


sliderContentImage.style.left = `-${sliderContentImageInfo.left}px`;
sliderContentImage.style.top = `${sliderContentImageInfo.top * 2}px`;
sliderContentImage.style.minWidth = `${window.innerWidth}px`;
sliderContentImage.style.minHeight = `${window.innerHeight}px`;
sliderContentImage.style.transform = `scale(1.05)`;


setTimeout(() => {
  sliderContentImage.style.left = `0px`;
  sliderContentImage.style.top = `0px`;
  sliderContentImage.style.minWidth = `${imageInfo.width}px`;
  sliderContentImage.style.minHeight = `${imageInfo.height}px`;
  sliderContentImage.style.transform = `scale(1)`;


  setTimeout(() => {
    sliderContentImage.style.minWidth = null;
    sliderContentImage.style.minHeight = null;
  }, 900)

  const title = $('.slider-content-info-title')[0];
  const spans = title.querySelectorAll('span');

  spans.forEach((item) => {
    item.classList.add(active)
  })

  sliderContentInfoType.classList.add(active);
  startProgress();
}, 9000)



const playPause = $el('#play-pause path');
const sliderContentButtonsPlay = $el('.slider-content-buttons-play');
const sliderContentButtonsPrev = $el('.slider-content-buttons-prev');
const sliderContentButtonsNext = $el('.slider-content-buttons-next');
const progressBar = $el('.progress-bar');

const playPauseIcons = {
  play: 'M13.25 8.16065V8.30252C13.25 8.76333 12.9965 9.18676 12.5903 9.40437L2.59028 14.7615C1.75757 15.2076 0.75 14.6043 0.75 13.6597L0.75 2.44636C0.75 1.48658 1.78685 0.884872 2.62017 1.36106L12.6202 7.07534C13.0096 7.29789 13.25 7.71207 13.25 8.16065Z',
  pause: 'M16.75 2V16C16.75 16.6904 16.1904 17.25 15.5 17.25H2C1.30964 17.25 0.75 16.6904 0.75 16V2C0.75 1.30964 1.30964 0.75 2 0.75L15.5 0.75C16.1904 0.75 16.75 1.30964 16.75 2Z'
}

let sliderActiveIndex = 0;
let percent = 0;
let int;

function startProgress(){
  int = startAutoLoadingSlider();
}


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
      nextSlider()
    }
  }, 50)
}

function nextSlider(){
  const obj = sliderInfo[sliderActiveIndex];
  const AllTitles = $('.slider-content-info-title');
  const footerHashtagsItem = $('.footer-hashtags-item');

  AllTitles.forEach((titleElem, index) => {
    const spans = titleElem.querySelectorAll('span');
    spans.forEach((spanElem) => {
      spanElem.classList.remove(active)
    })

    titleElem.classList.remove(active);
    titleElem.classList.remove(closed);
    titleElem.classList.remove(preparing);

    if(sliderActiveIndex > index){
      titleElem.classList.add(closed);
    } else if(sliderActiveIndex < index) {
      titleElem.classList.add(preparing);
    } else {
      titleElem.classList.add(active);
      spans.forEach((spanElem) => {
        spanElem.classList.add(active)
      })
    }

  })

  sliderContentInfoType.style.opacity = '0';
  sliderContentInfoType.style.transitionDelay = '0s';

  setTimeout(() => {
    sliderContentInfoType.innerText = '';
    sliderContentInfoType.insertAdjacentHTML('beforeend', obj.type);
    sliderContentInfoType.style.opacity = '1';
  }, 1000)



  footerHashtagsItem.forEach((hashtag) => hashtag.classList.remove(active))

  footerHashtagsItem[sliderActiveIndex].classList.add(active)


  sliderContentImage.style.backgroundImage = `url(${obj.img})`;
}


function changeSliderActive(){
  const footerHashtagsItem = $('.footer-hashtags-item');

  footerHashtagsItem.forEach((item, index) => {
    item.addEventListener('click', function (){
      percent = 0;
      sliderActiveIndex = index;
      nextSlider()
    })
  })
}



let status = false;
sliderContentButtonsPlay.addEventListener('click', function (){
  if(status){
    playPause.setAttribute('d', playPauseIcons.pause);
    int = startAutoLoadingSlider();
    playPause.parentElement.style.marginLeft = '0px';
  } else {
    playPause.setAttribute('d', playPauseIcons.play);
    clearInterval(int);
    int = undefined;
    playPause.parentElement.style.marginLeft = '6px';
  }

  status = !status;
})

// PREV SLIDER FUNCTION
sliderContentButtonsPrev.addEventListener('click', function (){
  if(sliderActiveIndex > 0){
    sliderActiveIndex -= 1;
  }
  percent = 0;

  if(sliderActiveIndex === sliderInfo.length - 1){
    sliderActiveIndex = 0;
  }
  nextSlider()
})

// NEXT SLIDER FUNCTION
sliderContentButtonsNext.addEventListener('click', function (){
  sliderActiveIndex += 1;
  percent = 0;

  if(sliderActiveIndex === sliderInfo.length - 1){
    sliderActiveIndex = 0;
  }
  nextSlider()
})



// ------------------------------
// ----------- MENU--------------
// ------------------------------

const navMenu = $el('.nav-menu');

navMenu.addEventListener('click', function (){
  navMenu.classList.toggle(active)
})

