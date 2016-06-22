import * as sharedActions from '../shared/votes/actions'

export default socket => store => next => action => {
  if (action.type in sharedActions) socket.emit('action', action)
  return next(action)
}
