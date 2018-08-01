import inquirer from 'inquirer';

import gameReducer from './game';
import { createStore } from 'redux';
import ai from './game/ai';

const game = createStore(gameReducer.reducer);

const printBoard = () => {
  const gameState = game.getState();
  for (let row = 0; row < 3; ++row) {
    for (let col = 0; col < 3; ++col) {
      process.stdout.write(gameState.board.getIn([row, col], '_'));
    }
    process.stdout.write('\n');
  }
};

const getInput = player => async () => {
  const { turn } = game.getState();
  if (turn !== player) return;
  const ans = await inquirer.prompt([
    {
      type: 'input',
      name: 'coord',
      message: `${turn}'s move (row,col):`,
    },
  ]);
  const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x);
  game.dispatch(gameReducer.move(turn, [row, col]));
};

const printWinner = () => {
  const { board } = game.getState();
  return gameReducer.checkWinner(board);
};

const aiMove = aiXO => {
  if (game.getState().turn === aiXO) {
    game.dispatch(gameReducer.move(aiXO, ai.chooseMove(game.getState())));
  }
};

game.subscribe(printBoard);
game.subscribe(() => game.getState());
game.subscribe(getInput('X'));
game.subscribe(() => aiMove('O'));
game.subscribe(() => {
  if (game.getState().winner) {
    console.log(game.getState().winner, 'is the winner!');
    process.exit(0);
  }
});
game.subscribe(printWinner);
game.subscribe(() => {
  if (game.getState().error) console.log(game.getState().error);
});

game.dispatch({ type: 'START' });
