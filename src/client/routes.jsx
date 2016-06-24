
/** @jsx html */
import { html } from 'snabbdom-jsx'
import { Votes } from './votes/components'
import { VotesAdmin } from './votes-admin/components'

export default {
  '#votes': {
    component: ({state}) => <Votes votes={state.votes} />
  },
  '#votes-admin': {
    component: () => <VotesAdmin />
  }
}
