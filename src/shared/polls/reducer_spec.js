
/* global describe, it */

import { polls } from './reducer'
import { ADD_VOTING, REMOVE_VOTING } from '../actions'
import { expect } from 'chai'
import { update, actionCreators } from '../util'

describe('store', () => {

  describe('polls', () => {
    const actions = actionCreators([ADD_VOTING, REMOVE_VOTING])
    it(`${ADD_VOTING} adds new voting to the state`, () => {
      expect(polls([], actions.addVoting('foo'))).eql(['foo'])
    })

    it(`${REMOVE_VOTING} removes voting from the state`, () => {
      expect(polls(['foo', 'bar', 'baz'], actions.removeVoting(1))).eql(['foo', 'baz'])
    })
  })
})
