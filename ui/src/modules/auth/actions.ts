import { TypedAction } from 'utils/redux'

export enum ActionNames {
  SetAuthToken = 'SET_AUTH_TOKEN'
}

export type Action = SetAuthTokenAction

interface SetAuthTokenPayload {
  token: string
  expire: number
}

export type SetAuthTokenAction = TypedAction<
  ActionNames.SetAuthToken,
  SetAuthTokenPayload
>

export function setAuthToken(payload: SetAuthTokenPayload): SetAuthTokenAction {
  return {
    type: ActionNames.SetAuthToken,
    payload
  }
}
