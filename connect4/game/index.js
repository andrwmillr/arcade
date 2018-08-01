import { Map } from 'immutable';
let board = Map();

const move = (player, position) => {
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
  const error = bad(state, action);
  if (error) {
    return { ...state, error };
  }
  return {
    board: boardReducer(state, action),
    turn: turnReducer(state, action),
    winner: winner(boardReducer(state, action)),
  };
};

const bad = (state, action) => {
  if (action.type === 'MOVE') {
    const posArr = action.position;
    if (posArr[0] < 0 || posArr[0] > 5 || posArr[1] < 0 || posArr[1] > 6) {
      return 'ERROR: please input a number between 0 and 2.';
    }
    // if (typeof posArr[0] != Number || typeof posArr[1] != Number) {
    //   console.log(posArr);
    //   return 'ERROR: integers only!';
    // }
    if (state.board.hasIn(action.position)) {
      return `ERROR: position ${action.position} is already filled.`;
    }
  }
  return null;
};

module.exports = { reducer, move };
