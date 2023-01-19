class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpContent = document.querySelector('.pop-up__content');
    this.replayBtn = document.querySelector('.replay-btn');
    this.replayBtn.addEventListener('click', (e) => {
      this.onClick && this.onClick();
    })
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  showWithText(text) {
    this.popUp.style.display = 'block'
    this.popUpContent.textContent = text;
  }

  hide(){
    this.popUp.style.display = 'none';
  }
}

export { PopUp }