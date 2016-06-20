
/* global describe, it */

import { getPair, getWinners, vote } from './index'
import { expect } from 'chai'

describe('votes', () => {
  describe('getPair', () => {
    it('gets first pair', () => {
      expect(getPair(['foo', 'bar', 'baz'])).to.eql({pair: {foo: 0, bar: 0}, entries: ['baz']})
    })

    it('errors if no pair', () => {
      expect(getPair).to.throw(Error)
    })
  })

  describe('getWinners', () => {
    it('always returns an array', () => {
      expect(getWinners({foo: 1, bar: 1})).to.be.a('array')
      expect(getWinners({foo: 0, bar: 1})).to.be.a('array')
      expect(getWinners({})).to.be.a('array')
      expect(getWinners()).to.be.a('array')
    })

    it('returns winners', () => {
      expect(getWinners({foo: 1, bar: 1})).to.eql(['foo', 'bar'])
      expect(getWinners({foo: 2, bar: 1})).to.eql(['foo'])
      expect(getWinners({foo: 1, bar: 2})).to.eql(['bar'])
    })
  })

  describe('vote', () => {
    it('updates votes', () => {
      expect(vote({foo: 0, bar: 1}, 'foo')).to.eql({foo: 1, bar: 1})
      expect(vote({foo: 0, bar: 1}, 'bar')).to.eql({foo: 0, bar: 2})
    })

    it('errors if name is not in pair', () => {
      expect(() => vote({foo: 1, bar: 2}, 'baz')).to.throw(Error)
    })
  })
})
