import io from './server'
import createStore from './store'
import entries from './movies.json'
import actions from './actions'
export const store = createStore()

import { update } from '../shared/util'

function actionHandler(store, action, socket) {
  if (action.socket) return
  return store.dispatch(update(action, {socket}))
}

io.on('connection', socket => {
  socket.emit('action', actions.fetchState(store.getState()))
  socket.on('action', action => actionHandler(store, action, socket))
})

store.dispatch(actions.setEntries(entries))

setInterval(() => {
  const { votes: { winner } } = store.getState()
  if (winner) {
    store.dispatch(actions.setEntries(entries))
  } else {
    store.dispatch(actions.next())
  }
}, 20000)
