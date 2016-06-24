
import createRoutes from './routes'
import { noop } from '../util'
import { expect } from 'chai'

/* global describe, it */

describe('routes reducer factory', () => {
  it('should return correct render result', () => {
    const createComp = title => (props, children = noop) => `${title} with ${children() || 'no children'}`
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
    actions.forEach((action, index) => {
      const cur = routes(action)
      console.log(cur())
      expect(cur()).equal(expected[index])
    })
  })
})
