import { reducer } from '.';
import { addToBoard } from '../index';

const possMoves = [0, 1, 2, 3, 4, 5, 6];

let counter = 0;

const score = (game, position) => {
  const nextMove = addToBoard(game.turn, position);
  const newGame = reducer(game, nextMove);
  if (newGame.winner === game.turn) {
    return 1;
  }
  if (newGame.winner === 'draw') {
    return 0;
  } else {
    if (counter < 100) {
      console.log('recursing...');
      counter++;
      return -Math.max(...possMoves.map(el => score(newGame, el)));
    }
  }
};

const chooseMove = state => {
  // if (possMoves.length === 9) {
  //   const getRandomInt = max => {
  //     return Math.floor(Math.random() * Math.floor(max));
  //   };
  //   return [getRandomInt(3), getRandomInt(3)];
  // }
  let bestScore = -1;
  let chosenMove;
  for (let i = 0; i < possMoves.length; i++) {
    if (score(state, possMoves[i]) > bestScore) {
      bestScore = score(state, possMoves[i]);
      chosenMove = possMoves[i];
    }
  }
  return chosenMove;
};

module.exports = { score, chooseMove };
