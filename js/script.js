const {
  active,
  none,
  show
} = {
  active: 'active',
  none: 'd-none',
  show: 'show'
}

function $el(name){
  return document.querySelector(name);
}

function $(name){
  return document.querySelectorAll(name);
}

const playPause = $el('#play-pause path');
const sliderContentButtonsPlay = $el('.slider-content-buttons-play');

const playPauseIcons = {
  play: 'M13.25 8.16065V8.30252C13.25 8.76333 12.9965 9.18676 12.5903 9.40437L2.59028 14.7615C1.75757 15.2076 0.75 14.6043 0.75 13.6597L0.75 2.44636C0.75 1.48658 1.78685 0.884872 2.62017 1.36106L12.6202 7.07534C13.0096 7.29789 13.25 7.71207 13.25 8.16065Z',
  pause: 'M16.75 2V16C16.75 16.6904 16.1904 17.25 15.5 17.25H2C1.30964 17.25 0.75 16.6904 0.75 16V2C0.75 1.30964 1.30964 0.75 2 0.75L15.5 0.75C16.1904 0.75 16.75 1.30964 16.75 2Z'
}

let status = false;
sliderContentButtonsPlay.addEventListener('click', function (){
  if(status){
    playPause.setAttribute('d', playPauseIcons.pause)
  } else {
    playPause.setAttribute('d', playPauseIcons.play)
  }

  status = !status;
})



const progressBar = $el('.progress-bar');

let percent = 0;
startProgress()
function startProgress(){
  let int = setInterval(() => {
    percent += 1;
    progressBar.setAttribute('style', `--percent: ${percent}%`);

    if(percent === 100){
      percent = 0;
    }
  }, 50)
}