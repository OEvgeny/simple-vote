import { noop } from '../util'
const ROUTE = 'ROUTE'

function routeReducerFactory (routes, routeAction = ROUTE) {
  if (!routes) return noop
  const route = routes => (state = {}, action = {}, level = 0) => {
    if (action.type === routeAction) {
      const currentRoute = routes[action.route[level]] || {}
      const {routes, component = noop, params = {}} = currentRoute
      const children = route(routes)(state, action, level + 1)
      return component({action, params, children})
    } else {
      return state
    }
  }
  return route(routes)
}

export default (routes, action) => {
  return routeReducerFactory(routes, action)
}
