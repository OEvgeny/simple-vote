
import { update } from '../util'

export function getPair (all) {
  const [p1, p2, ...entries] = all
  if (p1 == null || p2 == null) {
    throw new Error('There is no much entries to get pair')
    return all
  }
  return {entries, pair: {[p1]: 0, [p2]: 0}}
}

export function getWinners (pair) {
  if (!pair) return []
  const [p1, p2] = Object.keys(pair)
  const {[p1]: r1 = 0, [p2]: r2 = 0} = pair
  if (r1 > r2) return [p1]
  if (r1 < r2) return [p2]
  return [p1, p2]
}

export function vote (pair, name) {
  if (name in pair) {
    return update(pair, {[name]: ++pair[name]})
  } else {
    throw new Error(`Entry "${name}" is not in pair`)
    return pair
  }
}
