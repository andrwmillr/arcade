const checkError = (state, action) => {
  if (action && action.type === 'MOVE') {
    const posArr = action.position;
    if (posArr[0] < 0 || posArr[0] > 5 || posArr[1] < 0 || posArr[1] > 6) {
      return 'ERROR: please input a column between 0 and 6.';
    }
    if (state.board.hasIn(action.position)) {
      return `ERROR: position ${action.position} is already filled.`;
    }
  }
  return null;
};

export default checkError;
