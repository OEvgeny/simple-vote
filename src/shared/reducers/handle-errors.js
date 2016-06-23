import { noop } from '../util'

export default (handler = noop) => reducer => (state, action) => {
  let ret = state
  try {
    ret = reducer(state, action)
  } catch (error) {
    ret = handler(error, action, state, ret) || state
  }
  return ret
}
