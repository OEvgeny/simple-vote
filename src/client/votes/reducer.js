import { FETCH_VOTES } from './actions'
import { votes as votesReducer, initialState } from '../../shared/votes/reducer'

export function votes (state, action = {}) {
  switch (action.type) {
    case FETCH_VOTES:
      return action.votes
    default:
      return votesReducer(state, action)
  }
}
