/** @jsx html */
import { html } from 'snabbdom-jsx'
import './style.less'

import { store } from '../client'
import actions from '../actions'

import { Link } from '../components'

export const VotesAdmin = ({state}) => (
  <div selector=".votes-admin">
    <div selector=".votes-admin-header">
      <Link url="#votes"><h1>Votes</h1></Link>
    </div>
    <div selector=".votes-admin-main">
      <div selector=".votes-admin-sidebar"></div>
      <div selector=".votes-admin-content"></div>
    </div>
  </div>
)
