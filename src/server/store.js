import { createStore, combineReducers, applyMiddleware } from 'redux'
import handleErrors from '../shared/reducers/handle-errors'
import handleResponse from './respondMiddleware'
import { votes } from '../shared/votes/reducer'
import io from './server'

function errorHandler (err, action) {
  console.error(err, action)
  throw err
}

function responseHandler (error, action, store) {
  const { socket } = action
  console.log(error)
  if (socket) {
    if (error) {
      socket.emit('error', {error, state: store.getState()})
    }
    else {
      socket.emit('success')
      socket.broadcast.emit('action', action)
    }
  }
  else if (!error) {
    console.log('Sending to all', action)
    io.emit('action', action)
  }
}

export default function () {
  return createStore(
    handleErrors(errorHandler)(combineReducers({votes})),
    applyMiddleware(handleResponse(responseHandler))
  )
}
