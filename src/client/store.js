import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { votes } from '../shared/votes/reducer'
import fetchState from '../shared/reducers/fetch-state'
import { FETCH_STATE } from '../shared/actions'

export default function (middleware) {
  return createStore(
    fetchState(FETCH_STATE, combineReducers({votes})),
    compose(
      applyMiddleware(middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
