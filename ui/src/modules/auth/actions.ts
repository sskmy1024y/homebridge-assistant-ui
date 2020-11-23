import { TypedAction } from 'utils/redux'

export enum ActionNames {
  SetAuthToken = 'SET_AUTH_TOKEN',
  SetHbServiceHost = 'SET_HB_SERVICE_HOST'
}

export type Action = SetAuthTokenAction | SetHbServicePortAction

interface SetAuthTokenPayload {
  token: string
  expire: number
}

interface SetHbServicePortPayload {
  host: string
}

export type SetAuthTokenAction = TypedAction<
  ActionNames.SetAuthToken,
  SetAuthTokenPayload
>

export type SetHbServicePortAction = TypedAction<ActionNames.SetHbServiceHost, SetHbServicePortPayload>

export function setAuthToken(payload: SetAuthTokenPayload): SetAuthTokenAction {
  return {
    type: ActionNames.SetAuthToken,
    payload
  }
}

export function setHbServiceHost(payload: SetHbServicePortPayload): SetHbServicePortAction {
  return {
    type: ActionNames.SetHbServiceHost,
    payload
  }
}
