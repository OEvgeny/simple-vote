
import snabbdom from 'snabbdom'
import App from './App'
import createStore from './store'
import createClient from './client'
import { fetchVotes } from './votes/actions'
import remoteActions from './remote-actions'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners') // attaches event listeners
])

function updateUI (vnode, store) {
  const newVnode = App(store.getState())
  console.log(store.getState(), newVnode)
  return patch(vnode, newVnode)
}

function startApp () {
  const el = document.createElement('div')
  document.body.appendChild(el)

  const client = createClient()
  const store = createStore(remoteActions(client))
  console.log(store)
  let vnode = updateUI(el, store)
  store.subscribe(() => { vnode = updateUI(vnode, store) })

  client.on('votes', state => store.dispatch(fetchVotes(state)))
}

startApp()
