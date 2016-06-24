/** @jsx html */
import { html } from 'snabbdom-jsx'

import './assets/less/main.less'

export default (state, route) => (<div selector="#app">{route({state})}</div>)
