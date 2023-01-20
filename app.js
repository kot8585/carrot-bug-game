import { PopUp } from './modules/popUp.js';
import  GameField  from './modules/gamefield.js';

const game = document.querySelector('.game');

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

const gameField = new GameField(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function onItemClick(item) {
  if(!started) {
    return;
  }

  if(item === 'carrot-img'){    
    --carrotCount.textContent;
    if(parseInt(carrotCount.textContent) === 0){
      playSound(gameWinAudio);
      stop('YOU WON👏');
    }
  } else if(item === 'bug-img') {
    stop('YOU LOST🤢');
  }
} 

function playGame() {
  started = true;
  initGame();
  showStopButton();
  playSound(bgAudio);
  gameField.init();
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
  
  playBtn.style.visibility = 'visible';
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

