
import createRoutes from './routes'
import { expect } from 'chai'

/* global describe, it */

describe('routes reducer factory', () => {
  it('should work', () => {
    const createComp = title => ({children = 'no children'}) => `I'm ${title} with ${children}`
    expect(() => console.log(createRoutes({
        '/a': {component: createComp('Root A')},
        '/b': {component: createComp('Root B')},
        routes: {
          '/c': {component: createComp('A subroute C')}
        }
      })({}, {type: 'ROUTE', route: ['/a', '/c']}))).not.throw(Error)
  })
})
