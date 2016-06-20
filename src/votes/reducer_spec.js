
/* global describe, it */

import { votes } from './reducer'
import * as actions from './actions'
import { expect } from 'chai'
import { update } from '../util'

describe('store', () => {
  const initial = votes()

  describe('votes', () => {
    it(`${actions.SET_ENTRIES} sets entries to the state`, () => {
      const state = votes(initial, actions.setEntries(['foo', 'bar']))
      expect(state).to.eql(update(initial, {entries: ['foo', 'bar']}))

      const next = votes(state, actions.setEntries([...state.entries, 'buz']))
      expect(next).to.eql(update(initial, {entries: ['foo', 'bar', 'buz']}))
    })

    it(`${actions.NEXT} gets next pair of entries`, () => {
      const state = votes(initial, actions.setEntries(['foo', 'bar']))
      const next = votes(state, actions.next())
      expect(next).to.eql(update(initial, {entries: [], pair: {foo: 0, bar: 0}}))
    })

    it(`${actions.NEXT} sets winner then expected`, () => {
      const steps = [
        { type: actions.SET_ENTRIES, entries: ['foo', 'bar'] },
        { type: actions.NEXT },
        { type: actions.VOTE, entry: 'bar'},
        { type: actions.NEXT }
      ]
      const state = steps.reduce(votes, initial)
      expect(state).to.eql(update(initial, {entries: [], winner: 'bar', pair: {foo: 0, bar: 1}}))
    })

    it(`${actions.VOTE} adds vote to selected entry`, () => {
      const steps = [
        { type: actions.SET_ENTRIES, entries: ['foo', 'bar'] },
        { type: actions.NEXT },
        { type: actions.VOTE, entry: 'bar'}
      ]
      const state = steps.reduce(votes, initial)
      expect(state).to.eql(update(initial, {entries: [], pair: {foo: 0, bar: 1}}))
    })
  })
})
