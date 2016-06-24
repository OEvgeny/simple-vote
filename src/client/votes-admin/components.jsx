/** @jsx html */
import { html } from 'snabbdom-jsx'
import './style.less'

import { store } from '../client'
import actions from '../actions'

import { Link } from '../components'

const votesAdminSidebarLinks = [
  {title: 'Statistics', url: '#votes-admin/stats'}
]

export const AdminSideBar = ({links = []}) => (
  <ul selector=".admin-sidebar-menu">
    { links.map(({url, title}) => (<li selector=".sidebar-menu-item">
      <Link classes={['sidebar-link']} url={url}>{title}</Link>
    </li>)) }
  </ul>
)

export const VotesAdmin = ({state, route: Route}) => (
  <div selector=".votes-admin">
    <div selector=".votes-admin-header">
      <Link url="#votes"><h1>Votes</h1></Link>
    </div>
    <div selector=".votes-admin-main">
      <div selector=".votes-admin-sidebar">
        <AdminSideBar links={votesAdminSidebarLinks} />
      </div>
      <div selector=".votes-admin-content"><Route state={state} /></div>
    </div>
  </div>
)

export const VoteStats = ({state}) => {
  const { pair, entries, winner} = state.votes
  const names = Object.keys(pair || {})
  const status = winner ? '(ended)' : pair ? '(voting)' : '(pending)'
  return (
    <div selector=".vote-stats">
      <h2>Statistics</h2>
      <div selector=".panel-list">
        <div selector=".panel.stats-panel">
          <div selector=".panel-header">Current {status}</div>
          <div selector=".panel-content">
            { names && names.length
                ? (<div selector=".stats-pair">
                    <div selector=".pair-item">
                      <div>{ names[0] }</div>
                      <div selector=".pair-number">{ pair[names[0]] }</div>
                    </div>
                    <div selector=".pair-item">
                      <div>{ names[1] }</div>
                      <div selector=".pair-number">{ pair[names[1]] }</div>
                    </div>
                  </div>)
                : (<div selector=".stats-placeholder">
                    There is no active voting
                  </div>)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
