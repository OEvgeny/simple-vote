import { createStore, combineReducers } from 'redux'

const hello = (state = 'Hello world') => state

export default function () {
  return createStore(combineReducers({hello}))
}
