import io from 'socket.io-client'
import createStore from './store'
import createClient from './client'
import remoteActions from './remote-actions'
import createRouter from '../shared/router'
import routes from './routes'

export const client = io(`${location.protocol}//${location.hostname}:8090`)
export const store = createStore(remoteActions(client))
export const router = createRouter(routes)
