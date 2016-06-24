
import createRoutes from './routes'
import { noop } from '../util'
import { expect } from 'chai'

/* global describe, it */

describe('routes reducer factory', () => {
  it('should return correct render result', () => {
    const createComp = title => (props, {children = noop}) => `${title} with ${children() || 'no children'}`
    const routes = createRoutes({
      '/a': {
        component: createComp('A'),
        routes: {
          '/c': {component: createComp('A->C')}
        }
      },
      '/b': {component: createComp('B')},
    })
    const actions = [
      {route: ['/a']},
      {route: ['/a', '/b']},
      {route: ['/a', '/c']}
    ]
    const expected = [
      `A with no children`,
      `A with no children`,
      `A with A->C with no children`
    ]
    actions.reduce((state, next) => {
      const cur = routes(state, next)
      console.log(cur())
      expect(cur()).equal(expected.shift())
      return cur
    }, null)
  })
})
