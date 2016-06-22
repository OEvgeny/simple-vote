import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { votes } from './votes/reducer'

export default function (middleware) {
  return createStore(
    combineReducers({votes}),
    compose(
      applyMiddleware(middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
