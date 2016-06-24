import { createStore, combineReducers, applyMiddleware } from 'redux'
import handleErrors from '../shared/reducers/handle-errors'
import handleResponse from './respondMiddleware'
import { votes } from '../shared/votes/reducer'
import io from './server'
import { createAction } from './actions'

function errorHandler (err, action) {
  console.error(err, action)
  throw err
}

function responseHandler (error, action, store) {
  const { socket } = action
  if (socket) {
    if (error) {
      console.log('Socket error', error)
      socket.emit('error', {error, state: store.getState()})
    }
    else {
      socket.emit('success')
      console.log('Socket broadcast', createAction(action.type)(action.payload))
      socket.broadcast.emit('action', createAction(action.type)(action.payload))
    }
  }
  else if (!error) {
    console.log('Sending to all', createAction(action.type)(action.payload))
    io.emit('action', createAction(action.type)(action.payload))
  }
}

export default function () {
  return createStore(
    handleErrors(errorHandler)(combineReducers({votes})),
    applyMiddleware(handleResponse(responseHandler))
  )
}
