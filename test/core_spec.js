
/* global describe, it */
import { expect } from 'chai'
import { setEntries, next, vote } from '../src/core'

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds entries to the state', () => {
      const state = {entries: []}
      const entries = ['Trainspotting', '28 Days Later']
      const nextState = setEntries(state, entries)
      expect(nextState).to.eql({
        entries: ['Trainspotting', '28 Days Later']
      })
    })
  })

  describe('next', () => {
    it('takes next entries for voting', () => {
      const state = {
        entries: ['Trainspotting', '28 Days Later', 'Sunshine']
      }
      const nextState = next(state)
      expect(nextState).to.eql({
        vote: {
          pair: ['Trainspotting', '28 Days Later']
        },
        entries: ['Sunshine']
      })
    })
  })
})

describe('vote', () => {
  it('creates result of vote for selected entries', () => {
    const state = {
      vote: {pair: ['Trainspotting', '28 Days Later']},
      entries: []
    }
    const nextState = vote(state, 'Trainspotting')
    expect(nextState).toBe.eql({
      vote: {pair: ['Trainspotting', '28 Days Later']},
      tally: {
        'Trainspotting': 1
      },
      entries: []
    })
  })
})
