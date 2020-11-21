import { ServiceNS } from 'models/services/namespace'
import { ServiceType } from '@oznu/hap-client'
import { TypedAction } from 'utils/redux'

export enum ActionNames {
  SetServiceResponse = 'SET_SERVICE_RESPNSE'
}

export type Action = SetServiceResponseAction

interface Payload {
  namespace: ServiceNS
  response: ServiceType[]
}

export type SetServiceResponseAction = TypedAction<
  ActionNames.SetServiceResponse,
  Payload
>

/**
 * @deprecated TODO: Do some typing
 * @param payload
 */
export function setServiceResponse(payload: Payload): SetServiceResponseAction {
  return {
    type: ActionNames.SetServiceResponse,
    payload
  }
}
