import createStore from './store'
import startServer from './server'
import { setEntries, next } from '../shared/votes/actions'
import entries from './movies.json'

export const store = createStore()
startServer(store)

store.dispatch(setEntries(entries))

setInterval(() => {
  const { votes: { winner } } = store.getState()
  if (winner) {
    store.dispatch(setEntries(entries))
  } else {
    store.dispatch(next())
  }
}, 6000)
