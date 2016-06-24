import createRoutes from './routes'

function parsePath (path, routes) {
  return {
    route: path.split('/')
  }
}

function pushState (path, router, parse) {
  const state = router(null, parse(path))
  global.history.pushState({}, '', `${path}`)
  return state
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
  const router = createRoutes(routes)
  const parse = path => parsePath(path, routes)
  const push = path => state = pushState(path, router, parse)
  const subscriptions = []
  push(global.location.hash)
  return {
    parse,
    push,
    subscribe: fn => subscribe(subscriptions, fn),
    unsubscribe: fn => unsubscribe(subscriptions, fn),
    getState: () => state
  }
}
