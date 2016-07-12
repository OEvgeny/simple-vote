
import snabbdom from 'snabbdom'
import _ from 'lodash'

export const patch = snabbdom.init([
  require('snabbdom/modules/class'),          // makes it easy to toggle classes
  require('snabbdom/modules/props'),          // for setting properties on DOM elements
  require('snabbdom/modules/style'),          // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners') // attaches event listeners
])


function setPost(vnode, hook) {
  // set the `postpatch` hook of a node
  // should be made more robust by checking path existence
  vnode.data.hook = vnode.data.hook || {}
  vnode.data.hook.postpatch = hook
}

export function stateful (func) {
  const component = {
    vnode: null,
    render: () => render.call(component, component.props),
    update: redraw,
    props: {}
  }
  const render = func(component)

  function postHook(oldVnode, newVnode) {
    // we are here due to a global patch that has change our vnode
    component.vnode = newVnode // replace local reference to new vnode from global patch
    setPost(component.vnode, postHook) // install hook in new vnode
  }

  function redraw () {
    if (component.vnode != null) {
      component.vnode.data.hook.postpatch = null // hook should not be called in local patch
      let newVnode = patch(component.vnode, component.render(component.props)) // do local patch
      setPost(newVnode, postHook) // install hook in new vnode for future global patch
      Object.assign(component.vnode, newVnode) // merge in new vnode so global patch will use it
    }
  }

  return function (props) {
    component.props = props
    component.vnode = component.render() // Create initial vnode
    setPost(component.vnode, postHook) // install hook in initial vnode
    return component.vnode
  }
}
