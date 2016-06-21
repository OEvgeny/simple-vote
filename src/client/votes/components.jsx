/** @jsx html */
import { html } from 'snabbdom-jsx'

export const VoteHandle = ({entry}) => (
  <div selector=".vote-handle">
    <span>{pair[0]}</span>
    <button selector=".vote-btn" role="button">Vote!</button>
  </div>
)

export const EntriesList = ({entries = []}) => (
  <div selector=".entries-list">
    { entries.length
      ? entries.map(entry => (<div selector=".entries-list-item">{entry}</div>))
      : <div selector=".entiries.placeholder">There is now entries.</div> }
  </div>
)

export const VoteBoard = ({pair, winner}) => (
  <div selector=".vote-board">
    { winner
      ? <div selector=".vote-winner">{ winner }</div>
      : (<VoteHandle entry={pair[0]} /><VoteHandle entry={pair[1]} />) }
  </div>
)

export const Votes => ({votes}) => {
  const { pair, entries, winner} = votes
  const names = Object.keys(pair)
  return (
    <div selector="votes">
      <VoteBoard pair={names} winner={winner} />
      <EntriesList entries={entries} />
    </div>
  )
}
