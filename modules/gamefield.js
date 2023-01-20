'use strict'
const bugAudio = new Audio('./sound/bug_pull.mp3');
const carrotAudio = new Audio('./sound/carrot_pull.mp3');

export default class GameField {
  constructor(carrotCount, bugCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.gameField = document.querySelector('.game__field');
    this.gameField.addEventListener('click', (e) => {this.onClick(e)})
  }

  init() {
    this.gameField.innerHTML = '';
    this.addItem(this.carrotCount, "당근", './img/carrot.png', 'carrot-img');
    this.addItem(this.bugCount, "벌레", './img/bug.png', 'bug-img');
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  onClick(e) {

    const target = e.target;

    if(target.matches('.carrot-img')){  
      playSound(carrotAudio);
      target.remove();
      this.onItemClick && this.onItemClick('carrot-img');
    } else if(target.matches('.bug-img')){
      playSound(bugAudio);
      this.onItemClick && this.onItemClick('bug-img');
    }
  }

  addItem(count, type, src, className) {
    for (let i = 0; i < count; i++) { 
      const itemImg = document.createElement("img");
      itemImg.setAttribute('src', src);
      itemImg.style.top = `${getRandomHeight()}%`;
      itemImg.style.left = `${getRandomWidth()}%`;
      itemImg.setAttribute('alt', type);
      itemImg.setAttribute('class', className);

      this.gameField.append(itemImg);
    }
  }
}

function getRandomWidth() {
    return Math.ceil(Math.random() * 9 * 10);
}

function getRandomHeight() {
   return Math.ceil(Math.random() * 8 * 10); 
}

function playSound(sound) {
  sound.currentTime=0;
  sound.play();
}
