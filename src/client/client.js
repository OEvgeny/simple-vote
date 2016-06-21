import io from 'socket.io-client'
import { fetchVotes } from './votes/actions'

export default function createClient (store) {
  const socket = io(`${location.protocol}//${location.hostname}:8090`)
  socket.on('votes', state => store.dispatch(fetchVotes(state)))
  return socket
}
