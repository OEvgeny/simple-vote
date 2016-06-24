/** @jsx html */
import { html } from 'snabbdom-jsx'

import './assets/less/main.less'

export default (state, Route) => (<div selector="#app"><Route state={state} /></div>)
