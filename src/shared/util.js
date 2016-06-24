
export function update (state, data) {
  return Object.assign({}, state, data)
}

export function noop () {}

export const actionCreator = (meta = {}) => type => (payload, data = {}) => {
  return {type, payload, meta: update(meta, data)}
}

export const actionCreators = (actions, creator = actionCreator()) => {
  const actionCreators = {}
  actions.forEach(action => {
    const creatorName = action
      .split('_')
      .map((word, index) => index !== 0
        ? `${word[0]}${word.substr(1).toLowerCase()}`
        : word.toLowerCase())
      .join('')
    actionCreators[creatorName] = creator(action)
  })
  return actionCreators
}
