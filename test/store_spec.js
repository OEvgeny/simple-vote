
/* global describe, it */
import {expect} from 'chai'

import createStore from '../src/store'

describe('store', () => {

  it('store is configured in a right way', () => {
    const store = createStore()
    expect(store.getState()).to.eql({})

    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Trainspotting', '28 Days Later']
    })

    expect(store.getState()).to.eql({
      entries: ['Trainspotting', '28 Days Later']
    })
  })
})
