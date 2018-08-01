import { Map } from 'immutable';
import checkWinner from './checkWinner';
import checkError from './checkError';

let board = Map();

const move = (position, player) => {
  return { type: 'MOVE', player: player, position: position };
};

const turnReducer = (state, action) => {
  switch (action.type) {
    case 'START':
      return 'X';
    case 'MOVE':
      if (action.player === 'X') return 'O';
      else return 'X';
    default:
      return state.turn;
  }
};

const boardReducer = (state, action) => {
  switch (action.type) {
    case 'MOVE':
      const nextBoard = state.board.setIn(action.position, action.player);
      return nextBoard;
    default:
      return state.board;
  }
};

const reducer = (state = { board: board }, action) => {
  const error = checkError(state, action);
  if (error) {
    return { ...state, error };
  }
  return {
    board: boardReducer(state, action),
    turn: turnReducer(state, action),
    winner: checkWinner(
      boardReducer(state, action),
      action.position,
      action.player
    ),
  };
};

module.exports = { reducer, move, checkWinner };
