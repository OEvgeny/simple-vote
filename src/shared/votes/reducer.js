
import { getPair, getWinners, vote } from './index'
import { SET_ENTRIES, NEXT, VOTE, START_VOTING, STOP_VOTING } from '../actions'
import { update } from '../util'

const initialState = {
  entries: [],
  winner: null,
  pair: null,
  started: false
}

export function votes (state = initialState, action = {}) {
  switch (action.type) {
    case START_VOTING:
      return update(state, {started: true})
    case STOP_VOTING:
      return update(state, {started: false})
    case SET_ENTRIES:
      return update(initialState, {entries: action.payload})
    case NEXT:
      const entries = state.entries.concat(getWinners(state.pair))
      if (state.pair && entries.length === 1) return update(state, {winner: entries[0]})
      else return update(state, getPair(entries))
    case VOTE:
      if (state.started) {
        return update(state, {pair: vote(state.pair, action.payload)})
      } else {
        throw new Error('Voting is not started')
      }
    default:
      return state
  }
}
