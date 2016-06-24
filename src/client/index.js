
import snabbdom from 'snabbdom'
import App from './App'
import { store, client, router } from './client'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners') // attaches event listeners
])

function updateUI (vnode, store, router) {
  const newVnode = App(store.getState(), router.getState())
  return patch(vnode, newVnode)
}

function startApp () {
  const el = document.createElement('div')
  document.body.appendChild(el)

  let vnode = updateUI(el, store, router)
  const updateFn = () => { vnode = updateUI(vnode, store, router) }
  store.subscribe(updateFn)
  router.subscribe(updateFn)
  client.on('action', action => store.dispatch(action))
}

startApp()
