import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const CURRENT_TIME_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime() {
  player.getCurrentTime().then(time => {
    localStorage.setItem('CURRENT_TIME_KEY', Math.round(time));
  });
}

window.addEventListener('load', () => {
  const currentTime = localStorage.getItem('CURRENT_TIME_KEY');
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
  player.play();
});