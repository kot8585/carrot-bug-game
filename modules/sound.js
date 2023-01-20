const bgAudio = new Audio('./sound/bg.mp3');
const gameWinAudio = new Audio('./sound/game_win.mp3');
const alert = new Audio('./sound/alert.wav');
const bugAudio = new Audio('./sound/bug_pull.mp3');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');

export function playBackground() {
  playSound(bgAudio);
}

export function playWin() {
  playSound(gameWinAudio);
}

export function playAlert() {
  playSound(alert);
}

export function playBug() {
  playSound(bugAudio);
}

export function playCarrot() {
  playSound(carrotAudio);
}

export function stopBackground() {
  stopSound(bgAudio);
}

function playSound(sound) {
  sound.currentTime=0;
  sound.play();
}

function stopSound(sound){
  sound.pause();
}