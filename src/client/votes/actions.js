export const FETCH_VOTES = 'FETCH_VOTES'

export function fetchVotes (votes) {
  return {type: FETCH_VOTES, votes}
}
