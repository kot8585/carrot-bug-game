const game = document.querySelector('.game');

const play = document.querySelector('.play');
const playBtn = document.querySelector('.play-btn');

const carrotCount = document.querySelector('.carrot-count');
const playTime = document.querySelector('.play-time');

const result = document.querySelector('.result');
const replayBtn = document.querySelector('.replay-btn');
const resultContent = document.querySelector('.result-content');

const totalCarrotCount = 10;
const totalBugCount = 7;
let intervalID;

const bgAudio = new Audio('./sound/bg.mp3');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');
const bugAudio = new Audio('./sound/bug_pull.mp3');
const gameWinAudio = new Audio('./sound/game_win.mp3');
const alert = new Audio('./sound/alert.wav');

playBtn.addEventListener('click', (e) => {
    //changePlayBtn to Replay
    playBtn.innerHTML = `<i class="fa-solid fa-stop"></i>`
    
    if(playBtn.classList.contains('playing')){
      return stop('REPLAY ?');
    }
    
    
    bgAudio.currentTime = 0;
    bgAudio.play();
    playBtn.classList.add('playing');
    drawCarrotAndBug();
    startTimer();
})

replayBtn.addEventListener('click', (e) => {
  carrotCount.textContent = 0;
  bgAudio.currentTime = 0;
  bgAudio.play();
  playBtn.style.visibility = 'visible';
  playBtn.classList.add('playing');
  drawCarrotAndBug();
  startTimer();
})


function startTimer() {
  playTime.textContent = `0:10`;

  let secondValue;

  intervalID = setInterval(() => {
    secondValue = parseInt(playTime.textContent.split(':')[1], 10);
    playTime.textContent = `0:${--secondValue}`;
    if (secondValue <= 0) {
      alert.currentTime = 0;
      alert.play();
      stop('TIME OVER😡');
    }
  }, 1000);
}

function drawCarrotAndBug() {
  result.style.display = 'none';
  game.classList.remove('click-disable');

  let carrotAndBug = '';
  
  for (let i = 0; i < totalCarrotCount; i++) {
    const maxEighty = Math.ceil(Math.random() * 8 * 10);
    const maxNinety = Math.ceil(Math.random() * 9 * 10);

    carrotAndBug += `<img class="carrot-img" src="./img/carrot.png" alt="당근" style="top: ${maxEighty}%; left: ${maxNinety}%;">`;
  }

  for (let i = 0; i < totalBugCount; i++) {
    const maxEighty = Math.ceil(Math.random() * 8 * 10);
    const maxNinety = Math.ceil(Math.random() * 9 * 10);

    carrotAndBug += `<img class="bug-img" src="./img/bug.png" alt="무당벌레" style="top: ${maxEighty}%; left: ${maxNinety}%;">`;
  }

  play.innerHTML = carrotAndBug;
}

play.addEventListener('click', (e) => {

  const targetName = e.target.className;

  if(targetName === 'carrot-img'){    
    carrotAudio.currentTime = 0;
    carrotAudio.play();
    e.target.remove();
    ++carrotCount.textContent;
    if(parseInt(carrotCount.textContent) === totalCarrotCount){
      gameWinAudio.currentTime = 0;
      gameWinAudio.play();
      stop('YOU WON👏');
    }
  }
    
  if(targetName === 'bug-img') {
    bugAudio.currentTime=0;
    bugAudio.play();
    stop('YOU LOST🤢');
  }
})

function stop(content) {
  bgAudio.pause();
  playBtn.classList.remove('playing');
  playBtn.style.visibility = 'hidden';
  resultContent.textContent = content;
  replayBtn.classList.add('click-able');
  result.style.display = 'block'
  game.classList.add('click-disable');

  clearInterval(intervalID);
}