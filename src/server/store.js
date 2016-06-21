import { createStore, combineReducers } from 'redux'
import { votes } from '../shared/votes/reducer'

export default function () {
  return createStore(combineReducers({votes}))
}
