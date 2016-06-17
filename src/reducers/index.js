import { combineReducers } from 'redux'

function update(src, dest) {
  return Object.assign({}, src, dest)
}

function vote (state, entry) {
  const {
    vote: {pair, tally = {}},
  } = state
  let {[entry] : currentVal = 0} = tally
  return {tally: Object.assign({}, tally, {[entry]: ++currentVal})}
}

function getWinners (vote) {
  if (!vote) return []
  const [p1, p2] = vote.pair
  const {[p1]: r1 = 0, [p2]: r2 = 0} = vote.tally
  if (r1 > r2) return [p1]
  if (r1 < r2) return [p2]
  return [p1, p2]
}

export function next (state) {
  const [p1, p2, ...entries] = state.entries.concat(getWinners(state.vote))
  if (!p2) {
    return {
      winner: p1
    }
  } else {
    return {
      vote: {pair: [p1, p2]},
    }
  }
}
