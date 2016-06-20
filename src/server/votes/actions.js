
export const SET_ENTRIES = 'SET_ENTRIES'
export const NEXT = 'NEXT'
export const VOTE = 'VOTE'

export function setEntries (entries) {
  return {type: SET_ENTRIES, entries}
}

export function next () {
  return {type: NEXT}
}

export function vote (entry) {
  return {type: vote, entry}
}
