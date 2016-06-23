import { noop } from '../shared/util'

export default (handler = noop) => store => next => action => {
  let err
  let ret
  try {
    ret = next(action)
  } catch (error) {
    err = error
  }
  handler(err, action, store)
  return ret
}
