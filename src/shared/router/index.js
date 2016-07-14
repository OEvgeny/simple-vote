import createRoutes from './routes'

export function parsePath (path, routes) {
  const route = path.split('/')
  const params = {}
  let currentRoute = routes
  let level = 0
  while (currentRoute != null && level < route.length) {
    if (currentRoute[route[level]]) {
      currentRoute = currentRoute[route[level]].routes
      level++
    } else {
      const propPaths = Object.keys(currentRoute)
        .filter(key => key[0] === ':')
      if (propPaths.length > 1) {
        console.warn('Supported only one custom prop per route.')
      }
      if (propPaths.length !== 0) {
        const pathSegment = propPaths[0].substr(1)
        params[pathSegment] = route[level]
        currentRoute = currentRoute[propPaths[0]].routes
        level++
      } else { break }
    }
  }
  return { route, params }
}

function unsubscribe (subscriptions, fn) {
  const index = subscriptions.indexOf(fn)
  if (index !== -1) subscriptions.splice(index, 1)
}

function subscribe (subscriptions, fn) {
  if (fn instanceof Function && subscriptions.indexOf(fn) === -1) {
    subscriptions.push(fn)
    return () => unsubscribe(subscriptions, fn)
  }
}

function updateSubs (subscriptions, ...args) {
  subscriptions.forEach(sub => sub(...args))
}

export default function createRouter (routes) {
  let state
  const subscriptions = []
  const router = createRoutes(routes)
  const parse = path => parsePath(path, routes)
  const update = path => {
    state = router(parse(path))
    updateSubs(subscriptions, state, path)
  }
  const push = path => {
    global.history.pushState({}, '', `${path}`)
    update(path)
  }
  global.addEventListener('hashchange', () => update(location.hash))
  update(global.location.hash)
  return {
    parse,
    push,
    subscribe: fn => subscribe(subscriptions, fn),
    unsubscribe: fn => unsubscribe(subscriptions, fn),
    getState: () => state
  }
}
