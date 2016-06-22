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
        : <div selector=".entiries-placeholder">There is no upcomming votes.</div> }
      </div>
  </div>
)

export const VoteBoard = ({pair, winner}) => (
  <div selector=".vote-board">
    { pair && pair.length
      ? [<VoteHandle entry={pair[0]} />,<VoteHandle entry={pair[1]} />]
      : winner
        ? <div selector=".vote-winner">{ winner }</div>
        : <div selector=".vote-placeholder">There is no active voting</div> }
  </div>
)

export const Votes = ({votes}) => {
  const { pair, entries, winner} = votes
  const names = Object.keys(pair || {})
  return (
    <div selector=".votes">
      <section selector=".voting-section">
        <h1>Voting</h1>
        <VoteBoard pair={names} winner={winner} />
      </section>
      <section selector=".upcoming-section">
        <h1>Upcomming</h1>
        <EntriesList entries={entries} />
      </section>
    </div>
  )
}
