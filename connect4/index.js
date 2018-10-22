import inquirer from 'inquirer';

import { reducer, move, checkWinner } from './game';
import { createStore } from 'redux';

const game = createStore(reducer);

const printBoard = () => {
  const gameState = game.getState();
  for (let row = 0; row < 6; ++row) {
    for (let col = 0; col < 7; ++col) {
      process.stdout.write(gameState.board.getIn([row, col], '_'));
    }
    process.stdout.write('\n');
  }
};

const addToBoard = (turn, col) => {
  const { board } = game.getState();
  for (let row = 5; row >= 0; row--) {
    if (!board.getIn([row, col])) {
      return move([row, col], turn);
    }
  }
};

const getInput = player => async () => {
  const { turn } = game.getState();
  if (turn !== player) return;
  const ans = await inquirer.prompt([
    {
      type: 'input',
      name: 'coord',
      message: `${turn}'s move (col):`,
    },
  ]);
  const [col = 0] = ans.coord.split(/[,\s+]/).map(x => +x);
  const nextMove = addToBoard(turn, col);
  game.dispatch(nextMove);
};

const printWinner = () => {
  const { board } = game.getState();
  return checkWinner(board);
};

const playC4 = () => {
  game.subscribe(printBoard);
  game.subscribe(() => game.getState());
  game.subscribe(getInput('X'));
  game.subscribe(getInput('O'));
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
};

export default playC4;
