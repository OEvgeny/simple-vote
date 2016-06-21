/** @jsx html */
import { html } from 'snabbdom-jsx'
import './style.less'

export const VoteHandle = ({entry}) => (
  <div selector=".vote-handle">
    <span>{ entry }</span>
    <button selector=".vote-btn" role="button">Vote!</button>
  </div>
)

export const EntriesList = ({entries = []}) => (
  <div selector=".entries-list">
    <div selector=".entiries-wrap">
      { entries.length
        ? entries.map(entry => (<div selector=".entries-list-item">{entry}</div>))
        : <div selector=".entiries.placeholder">There is now entries.</div> }
      </div>
  </div>
)

export const VoteBoard = ({pair, winner}) => (
  <div selector=".vote-board">
    { !winner && pair
      ? [<VoteHandle entry={pair[0]} />,<VoteHandle entry={pair[1]} />]
      : <div selector=".vote-winner">{ winner || 'There is no winner now' }</div> }
  </div>
)

export const Votes = ({votes}) => {
  const { pair, entries, winner} = votes
  const names = Object.keys(pair || {})
  return (
    <div selector=".votes">
      <h1>Voting</h1>
      <VoteBoard pair={names} winner={winner} />
      <h1>Upcomming</h1>
      <EntriesList entries={entries} />
    </div>
  )
}
