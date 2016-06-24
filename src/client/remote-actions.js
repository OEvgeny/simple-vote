export default socket => store => next => action => {
  const {meta: { source }} = action
  if (source === 'client') socket.emit('action', action)
  return next(action)
}
