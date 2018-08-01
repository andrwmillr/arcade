const checkVertical = (board, lastMove, turn) => {
  const row = lastMove[0];
  const col = lastMove[1];
  for (let i = 1; i < 4; i++) {
    const current = board.getIn([row + i, col]);
    if (current !== turn) return false;
  }
  return true;
};

const checkHorizontal = (board, lastMove, turn) => {
  const row = lastMove[0];
  const col = lastMove[1];
  let counter = 0;
  for (let i = 1; i < 4; i++) {
    const current = board.getIn([row, col + i]);
    if (current !== turn) {
      counter++;
      break;
    }
  }
  for (let i = 1; i < 4; i++) {
    const current = board.getIn([row, col - i]);
    if (current !== turn) {
      counter++;
      break;
    }
  }
  if (counter < 2) return true;
  return false;
};

const checkDiagonal = (board, lastMove, turn) => {
  const row = lastMove[0];
  const col = lastMove[1];
  let counter = 0;
  for (let i = 1; i < 4; i++) {
    const current = board.getIn([row + i, col + i]);
    if (current !== turn) {
      counter++;
      break;
    }
  }
  for (let i = 1; i < 4; i++) {
    const current = board.getIn([row + i, col - i]);
    if (current !== turn) {
      counter++;
      break;
    }
  }
  if (counter < 2) return true;
  else return false;
};

const checkDraw = board => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      if (!board.getIn([row, col])) return false;
    }
  }
  return true;
};

const checkWinner = (board, lastMove, turn) => {
  if (!lastMove) return false;
  if (checkDiagonal(board, lastMove, turn)) return turn;
  if (checkHorizontal(board, lastMove, turn)) return turn;
  if (checkVertical(board, lastMove, turn)) return turn;
  if (checkDraw(board)) return 'draw';
  return false;
};

export default checkWinner;
