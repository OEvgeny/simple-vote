import { createStore, combineReducers } from 'redux'
import { votes } from './votes/reducer'

const hello = (state = 'Hello world') => state

export default function () {
  return createStore(combineReducers({hello, votes}))
}
