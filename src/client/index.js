
import snabbdom from 'snabbdom'
import App from './App'
import createStore from './store'

const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners') // attaches event listeners
])

function updateUI (vnode, store) {
  const newVnode = App(store.getState())
  return patch(vnode, newVnode)
}

function startApp () {
  const el = document.createElement('div')
  document.body.appendChild(el)
  let vnode = el

  const store = createStore()
  store.subscribe(() => { vnode = updateUI(vnode, store) })

  updateUI(el, store)
}

startApp()
