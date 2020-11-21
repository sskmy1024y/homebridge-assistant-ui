import { Action, ActionNames, State, initialState } from '.'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.SetAuthToken:
      return {
        token: action.payload.token,
        expire: action.payload.expire
      }
    default:
      return state
  }
}
