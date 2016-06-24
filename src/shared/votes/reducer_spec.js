
/* global describe, it */

import { votes } from './reducer'
import {SET_ENTRIES, NEXT, VOTE} from '../actions'
import { expect } from 'chai'
import { update, actionCreators } from '../util'

describe('store', () => {
  const initial = votes()
  const actions = actionCreators([SET_ENTRIES, NEXT, VOTE])

  describe('votes', () => {
    it(`${SET_ENTRIES} sets entries to the state`, () => {
      const state = votes(initial, actions.setEntries(['foo', 'bar']))
      expect(state).eql(update(initial, {entries: ['foo', 'bar']}))

      const next = votes(state, actions.setEntries([...state.entries, 'buz']))
      expect(next).eql(update(initial, {entries: ['foo', 'bar', 'buz']}))
    })

    it(`${SET_ENTRIES} clears previouse winner`, () => {
      const state = votes(update(initial, {winner: 'baz', pair: ['foo', 'bar']}), actions.setEntries(['foo', 'bar']))
      expect(state).eql(update(initial, {entries: ['foo', 'bar']}))
    })

    it(`${NEXT} gets next pair of entries`, () => {
      const state = votes(initial, actions.setEntries(['foo', 'bar']))
      const next = votes(state, actions.next())
      expect(next).eql(update(initial, {entries: [], pair: {foo: 0, bar: 0}}))
    })

    it(`${NEXT} sets winner only after pair was selected`, () => {
      const state = votes(initial, actions.setEntries(['bar']))
      let next
      expect(() => next = votes(state, actions.next())).throw(Error)
      expect(next).undefined
    })

    it(`${NEXT} sets winner then expected`, () => {
      const steps = [
        { type: SET_ENTRIES, payload: ['foo', 'bar', 'baz'] },
        { type: NEXT },
        { type: VOTE, payload: 'bar'},
        { type: NEXT },
        { type: NEXT },
        { type: NEXT },
        { type: VOTE, payload: 'bar'},
        { type: NEXT },
        { type: NEXT }
      ]
      const state = steps.reduce(votes, initial)
      expect(state).eql(update(initial, {entries: [], winner: 'bar', pair: {baz: 0, bar: 1}}))
    })

    it(`${VOTE} adds vote to selected entry`, () => {
      const steps = [
        { type: SET_ENTRIES, payload: ['foo', 'bar'] },
        { type: NEXT },
        { type: VOTE, payload: 'bar'}
      ]
      const state = steps.reduce(votes, initial)
      expect(state).eql(update(initial, {entries: [], pair: {foo: 0, bar: 1}}))
    })
  })
})
