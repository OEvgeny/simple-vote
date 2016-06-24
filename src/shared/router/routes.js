import { noop } from '../util'

function routeReducerFactory (routes) {
  if (!routes) return noop
  const route = routes => (state, action = {}, level = 0) => {
    const currentRoute = routes[action.route[level]] || {}
    const {routes: currentRoutes, component = noop, params = {}} = currentRoute
    const children = routeReducerFactory(currentRoutes)(state, action, level + 1)
    return (args) => component(args, {action, params, children})
  }
  return route(routes)
}

export default (routes) => {
  return routeReducerFactory(routes)
}
