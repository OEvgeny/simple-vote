import {SET_ENTRIES, NEXT, VOTE} from '../shared/actions'
import {actionCreator, actionCreators} from '../shared/util'

export const createAction = actionCreator({source: 'client'})
export default actionCreators([SET_ENTRIES, NEXT, VOTE], createAction)
