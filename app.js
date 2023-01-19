import { Item } from './modules/item.js';
import { PopUp } from './modules/popUp.js';

const game = document.querySelector('.game');

const play = document.querySelector('.play');
const playBtn = document.querySelector('.play-btn');
const carrotCount = document.querySelector('.carrot-count');
const playTime = document.querySelector('.play-time');

const icon = document.querySelector('.fa-solid');

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const TIME_DURATION = 10;
let intervalID;
let started = false;

const bgAudio = new Audio('./sound/bg.mp3');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');
const bugAudio = new Audio('./sound/bug_pull.mp3');
const gameWinAudio = new Audio('./sound/game_win.mp3');
const alert = new Audio('./sound/alert.wav');

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(playGame);

playBtn.addEventListener('click', (e) => {
    if(started){
      stop('REPLAY ?');
    } else {
      playGame();
    }    
})

play.addEventListener('click', (e) => {
  const targetName = e.target.className;

  if(!started) {
    return;
  }

  if(targetName === 'carrot-img'){    
    playSound(carrotAudio);
    e.target.remove();
    --carrotCount.textContent;
    if(parseInt(carrotCount.textContent) === 0){
      playSound(gameWinAudio);
      stop('YOU WON👏');
    }
  }
    
  if(targetName === 'bug-img') {
    playSound(bugAudio);
    stop('YOU LOST🤢');
  }
})

function playGame() {
  started = true;
  initGame();
  showStopButton();
  playSound(bgAudio);
  addItem(CARROT_COUNT, "당근", './img/carrot.png', 'carrot-img');
  addItem(BUG_COUNT, "벌레", './img/bug.png', 'bug-img');
  startTimer();
}

function stop(text) {
  started = false;
  bgAudio.pause();
  playBtn.classList.remove('playing');
  playBtn.style.visibility = 'hidden';
  gameFinishBanner.showWithText(text);
  clearInterval(intervalID);
}

function initGame() {
  play.innerHTML = '';
  playBtn.style.visibility = 'visible';
  game.classList.remove('click-disable');
  gameFinishBanner.hide();
  updateTimerText(TIME_DURATION);
  carrotCount.textContent = CARROT_COUNT;
}

function playSound(sound) {
  sound.currentTime=0;
  sound.play();
}

function showStopButton() {
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}


function startTimer() {
  if(intervalID) clearInterval(intervalID);
  let remainingTimeSec = TIME_DURATION;

  intervalID = setInterval(() => {
    if (remainingTimeSec <= 0) {
      playSound(alert);
      return stop('TIME OVER😡');
    } 
    updateTimerText(--remainingTimeSec);
  }, 1000);
}

function updateTimerText(time) {
  const minute = Math.floor(time/60);
  const second = time % 60;
    
  playTime.textContent = `${minute}:${second}`;
}

function addItem(count, type, src, className) {
    for (let i = 0; i < count; i++) { 
    const item = new Item(type, src, className);
    item.createItemElement();
  }
}