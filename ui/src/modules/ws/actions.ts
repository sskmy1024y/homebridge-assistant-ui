import { ServiceNS } from 'models/services/namespace'
import { TypedAction } from 'utils/redux'
import { WsService } from 'models/WsService'

export enum ActionNames {
  SetSocket = 'SET_SOCKET',
  SetSocketResponse = 'SET_SOCKET_RESPNSE'
}

export type Action = SetSocketAction

interface SetSocketPayload {
  namespace: ServiceNS
  wsService: WsService
}

export type SetSocketAction = TypedAction<
  ActionNames.SetSocket,
  SetSocketPayload
>

export function setSocket(payload: SetSocketPayload): SetSocketAction {
  return {
    type: ActionNames.SetSocket,
    payload
  }
}
