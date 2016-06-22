import io from 'socket.io-client'

export default function createClient () {
  const socket = io(`${location.protocol}//${location.hostname}:8090`)
  return socket
}
