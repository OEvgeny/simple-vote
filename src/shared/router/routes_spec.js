
import createRoutes from './routes'
import { parsePath } from './index'
import { noop } from '../util'
import { expect } from 'chai'

/* global describe, it */

describe('routes reducer factory', () => {
  it('should return correct render result', () => {
    const createComp = title => (props, children = noop) => `${title} with ${children() || 'no children'}`
    const routesMap = {
      'a': {
        component: createComp('A'),
        routes: {
          'c': {component: createComp('A->C')}
        }
      },
      'b': {component: createComp('B')},
    }
    const routes = createRoutes(routesMap)
    const actions = [
      'a', 'a/b', 'a/c'
    ].map(path => parsePath(path, routesMap))
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

  it('should work with props', () => {
    const createComp = title => (props, children, {action: {params = {}}}) => `${title} id:${params.id}`
    const routesMap = {
      'a': {
        component: createComp('A'),
        routes: {
          ':id': {component: createComp('A->C')}
        }
      }
    }
    const routes = createRoutes(routesMap)
    const actions = [
      'a/1/', 'a/2/', 'a/3/'
    ].map(path => parsePath(path, routesMap))
    const expected = [
      `A id:1`,
      `A id:2`,
      `A id:3`
    ]
    actions.forEach((action, index) => {
      const cur = routes(action)
      console.log(cur())
      expect(cur()).equal(expected[index])
    })
  })
})
