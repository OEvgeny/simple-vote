
/** @jsx html */
import { html } from 'snabbdom-jsx'
import { Votes } from './votes/components'
import { VotesAdmin, VoteStats, Voting } from './votes-admin/components'

export default {
  '#votes': {
    component: ({state}) => <Votes votes={state.votes} />
  },
  '#votes-admin': {
    component: ({state}, route) => <VotesAdmin state={state} route={route} />,
    routes: {
      'stats': {
        component: ({state}) => <VoteStats state={state} />
      },
      'voting': {
        component: ({state}) => <Voting state={state} />
      }
    }
  }
}
