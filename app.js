import { PopUp } from './modules/popUp.js';
import Game from './modules/game.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const TIME_DURATION = 10;

const game = new Game(CARROT_COUNT, BUG_COUNT, TIME_DURATION);
game.setGameStopListener(onGameStop);

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(game.play.bind(game));

function onGameStop(text) {
  switch(text) {
    case 'cancel':
      gameFinishBanner.showWithText('REPLAY❓');
      break;
    case 'timeOver':
      gameFinishBanner.showWithText('TIME OVER😡');
      break;
    case 'lose':
      gameFinishBanner.showWithText('YOU LOST🤢');
      break;
    case 'win':
      gameFinishBanner.showWithText('YOU WON👏');
      break;
  }
}






