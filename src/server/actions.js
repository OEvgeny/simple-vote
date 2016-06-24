import {FETCH_STATE, SET_ENTRIES, NEXT, VOTE} from '../shared/actions'
import {actionCreator, actionCreators} from '../shared/util'

export const createAction = actionCreator({source: 'server'})
export default actionCreators([FETCH_STATE, SET_ENTRIES, NEXT, VOTE], createAction)