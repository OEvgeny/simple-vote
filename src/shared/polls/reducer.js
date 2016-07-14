
import { voting } from '../votes/reducer'
import { ADD_VOTING, REMOVE_VOTING } from '../actions'
const initialState = []

export function polls (state = initialState, action = {}) {
  const newState = state.slice()
  switch (action.type) {
    case ADD_VOTING:
      newState.push(action.payload)
      return newState
    case REMOVE_VOTING:
      newState.splice(action.payload, 1)
      return newState
    default:
      const {params: { index } = {}} = action
      if (index) return state.slice().splice(index, 1, voting(state[index], action))
      else return state
  }
}
