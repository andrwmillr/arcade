import {reducer, move} from '.'

// returns all remaining open spaces
const moves = board => {
  let possMoves = []
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      if (!board.hasIn([r, c])) {
        possMoves.push([r, c])
      }
    }
  }
  return possMoves
}

// given a space, returns 1, 0, -1 depending onf whether moving moving into that space resuls in a win, draw, or loss
const score = (game, position) => {
  const newGame = reducer(game, move(game.turn, position))
  if (newGame.winner === game.turn) {
    return 1
  }
  if (newGame.winner === 'draw') {return 0}
  else {
    const oppMoves = moves(newGame.board)
    return -Math.max(...oppMoves.map(el => score(newGame, el)))
  }
}


// chooses move with highest score; random if first move
const chooseMove = (state) => {
  const possMoves = moves(state.board)
  if (possMoves.length === 9) {
    const getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max))
    }
    return [getRandomInt(3), getRandomInt(3)]
  }
  let bestScore = -2;
  let chosenMove;
  for (let i = 0; i < possMoves.length; i++) {
    if (score(state, possMoves[i]) > bestScore) {
      bestScore = score(state, possMoves[i])
      chosenMove = possMoves[i]
    }
  }
  return chosenMove
}

module.exports = { moves, score, chooseMove }
