import createStore from './store'
import startServer from './server'
import { setEntries } from './votes/actions'
import entries from "./movies.json"

export const store = createStore()
startServer(store)

store.dispatch(setEntries(entries))
