
/* global describe, it */

import createStore from './store'
import { votes } from '../shared/votes/reducer'
import { next, setEntries } from '../shared/votes/actions'

import { expect } from 'chai'

describe('server store', () => {
  const store = createStore()

  it('creates store', () => {
    const state = {votes: votes()}
    expect(store.getState()).object
  })

  it('handles errors', () => {
    store.dispatch(setEntries(['bar']))
    const state = store.getState()
    expect(() => store.dispatch(next())).not.throw(Error)
    expect(store.getState()).eql(state)
  })
})
