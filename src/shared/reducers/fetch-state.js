export default (fetchAction, reducer) => (state, action = {}) => {
  if (action.type === fetchAction) return action.payload
  else return reducer(state, action)
}
