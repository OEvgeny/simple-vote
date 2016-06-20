import { createStore, combineReducers } from 'redux'
import { votes } from './votes/reducer'

export default function () {
  return createStore(combineReducers({votes}))
}
