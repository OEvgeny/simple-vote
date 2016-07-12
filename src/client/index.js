
import App from './App'
import { store, client, router } from './client'

import { patch } from './snabbdom'

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
