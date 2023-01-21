import { PopUp } from './modules/popUp.js';
import { GameBuilder } from './modules/game.js';

const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const TIME_DURATION = 10;

const game = new GameBuilder()
  .withCarrotCount(CARROT_COUNT)
  .withBugCount(BUG_COUNT)
  .withTimeDuration(TIME_DURATION)
  .build();
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






