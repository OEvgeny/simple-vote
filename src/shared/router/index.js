import createRoutes from './routes'

function parsePath (path, routes) {
  return {
    route: path.split('/')
  }
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
