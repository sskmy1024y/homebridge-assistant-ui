import { Action, ActionNames, State, initialState } from '.'
import { Constants } from 'utils/constants'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.SetAuthToken: {
      // Save to localStorage when token is updated
      window.localStorage.setItem(
        Constants.localStorage.accessToken,
        JSON.stringify(action.payload.token)
      )

      return {
        ...state,
        token: action.payload.token,
        expire: action.payload.expire
      }
    }
    case ActionNames.SetHBServiceConfig: {
      return {
        ...state,
        host: action.payload.host,
        userId: action.payload.userId
      }
    }
    default:
      return state
  }
}
