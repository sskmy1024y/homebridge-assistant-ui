import { TypedAction } from 'utils/redux'

export enum ActionNames {
  SetAuthToken = 'SET_AUTH_TOKEN',
  SetHBServiceConfig = 'SET_HB_SERVICE_CONFIG'
}

export type Action = SetAuthTokenAction | SetHBServiceConfigAction

interface SetAuthTokenPayload {
  token: string
  expire: number
}

interface SetHBServiceConfigPayload {
  host: string
  userId: string
}

export type SetAuthTokenAction = TypedAction<
  ActionNames.SetAuthToken,
  SetAuthTokenPayload
>

export type SetHBServiceConfigAction = TypedAction<
  ActionNames.SetHBServiceConfig,
  SetHBServiceConfigPayload
>

export function setAuthToken(payload: SetAuthTokenPayload): SetAuthTokenAction {
  return {
    type: ActionNames.SetAuthToken,
    payload
  }
}

export function setHbServiceConfig(
  payload: SetHBServiceConfigPayload
): SetHBServiceConfigAction {
  return {
    type: ActionNames.SetHBServiceConfig,
    payload
  }
}
