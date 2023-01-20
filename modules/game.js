import  GameField  from './gamefield.js';
import * as sound from './sound.js';

export default class Game {
  constructor(carrotCount, bugCount, timeDuration){
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.timeDuration = timeDuration;

    this.playBtn = document.querySelector('.play-btn');
    this.playBtn.addEventListener('click', (e) => {
      if(this.started){
        this.stop('cancel');
      } else {
        this.play();
      }    
  })
    this.score = document.querySelector('.carrot-count');
    this.playTime = document.querySelector('.play-time');
    this.icon = document.querySelector('.fa-solid');
    this.gameField = new GameField(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);
    this.intervalID;
    this.started = false;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  
  play() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    sound.playBackground();
    this.gameField.init();
    this.startTimer();
  }

  stop(text) {
    this.onGameStop && this.onGameStop(text);
    this.started = false;
    sound.stopBackground();
    this.playBtn.classList.remove('playing');
    this.playBtn.style.visibility = 'hidden';
    clearInterval(this.intervalID);
  }

  initGame() {  
    this.playBtn.style.visibility = 'visible';
    this.updateTimerText(this.timeDuration);
    this.score.textContent = this.carrotCount;
  }

  showStopButton() {
    this.icon.classList.add('fa-stop');
    this.icon.classList.remove('fa-play');
  }


  startTimer() {
    if(this.intervalID) clearInterval(this.intervalID);
    let remainingTimeSec = this.timeDuration;

    this.intervalID = setInterval(() => {
      if (remainingTimeSec <= 0) {
        sound.playAlert();
        return this.stop('timeOver');
      } 
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  updateTimerText(time) {
    const minute = Math.floor(time/60);
    const second = time % 60;
      
    this.playTime.textContent = `${minute}:${second}`;
  }

  onItemClick = (item) => {
    if(!this.started) {
      return;
    }

    if(item === 'carrot-img'){    
      --this.score.textContent;
      if(parseInt(this.score.textContent) === 0){
        sound.playWin();
        this.stop('win');
      }
    } else if(item === 'bug-img') {
      this.stop('lose');
    }
  } 
}