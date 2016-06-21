/** @jsx html */
import { html } from 'snabbdom-jsx'
import { Votes } from './votes/components'

import './assets/less/main.less'

export default (state) => (<div selector="#app"><Votes votes={state.votes} /></div>)
