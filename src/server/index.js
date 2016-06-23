import io from './server'
import createStore from './store'
import { setEntries, next } from '../shared/votes/actions'
import entries from './movies.json'

export const store = createStore()

import { update } from '../shared/util'
function actionHandler(store, action, socket) {
  if (action.socket) return
  return store.dispatch(update(action, {socket}))
}

io.on('connection', socket => {
  socket.emit('votes', store.getState().votes)
  socket.on('action', action => actionHandler(store, action, socket))
})

store.dispatch(setEntries(entries))

setInterval(() => {
  const { votes: { winner } } = store.getState()
  if (winner) {
    store.dispatch(setEntries(entries))
  } else {
    store.dispatch(next())
  }
}, 6000)
