function getRandomWidth() {
    //이 클레스 안에서만 사용하는건데 여기다 선언하는거 맞나
    return Math.ceil(Math.random() * 9 * 10);
}

function getRandomHeight() {
   return Math.ceil(Math.random() * 8 * 10); 
  }

class Item {
  constructor(type, src, className) {
    this.type = type;
    this.src = src;
    this.className = className;
  }

  createItemElement() {
    const itemImg = document.createElement("img");
    itemImg.setAttribute('src', this.src);
    itemImg.style.top = `${getRandomHeight()}%`;
    itemImg.style.left = `${getRandomWidth()}%`;
    itemImg.setAttribute('alt', this.type);
    itemImg.setAttribute('class', this.className);

    const play = document.querySelector('.play');
    play.append(itemImg);
  }
}

export {Item};