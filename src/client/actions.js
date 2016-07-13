import {SET_ENTRIES, NEXT, VOTE, START_VOTING, STOP_VOTING} from '../shared/actions'
import {actionCreator, actionCreators} from '../shared/util'

export const createAction = actionCreator({source: 'client'})
export default actionCreators(
  [SET_ENTRIES, NEXT, VOTE, START_VOTING, STOP_VOTING],
  createAction
)
