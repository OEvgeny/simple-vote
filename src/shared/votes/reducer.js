
import { getPair, getWinners, vote } from './index'
import { SET_ENTRIES, NEXT, VOTE } from '../actions'
import { update } from '../util'

const initialState = {
  entries: [],
  winner: null,
  pair: null
}

export function votes (state = initialState, action = {}) {
  switch (action.type) {
    case SET_ENTRIES:
      return update(initialState, {entries: action.payload})
    case NEXT:
      const entries = state.entries.concat(getWinners(state.pair))
      if (state.pair && entries.length === 1) return update(state, {winner: entries[0]})
      else return update(state, getPair(entries))
    case VOTE:
      return update(state, {pair: vote(state.pair, action.payload)})
    default:
      return state
  }
}
