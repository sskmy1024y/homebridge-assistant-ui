import { TypedAction } from 'utils/redux'
import { VRM } from '@pixiv/three-vrm'

export enum ActionNames {
  InitAssistant = 'INIT_ASSISTANT',
  SetVRMConfig = 'SET_VRM_CONFIG',
  SetFetchStatus = 'SET_FETCH_STATUS'
}

export type Action =
  | InitAssistantAction
  | SetVRMConfigAction
  | SetFetchStatusAction

interface InitAssistantPayload {
  vrm: VRM
}

interface SetVRMConfigPayload {
  vrmPath: string
  camera: {
    position: {
      x: number
      y: number
      z: number
    }
    target: {
      x: number
      y: number
      z: number
    }
  }
}

interface SetFetchStatusPayload {
  status: 'ok' | 'error' | null
}

export type InitAssistantAction = TypedAction<
  ActionNames.InitAssistant,
  InitAssistantPayload
>

export type SetVRMConfigAction = TypedAction<
  ActionNames.SetVRMConfig,
  SetVRMConfigPayload
>

export type SetFetchStatusAction = TypedAction<
  ActionNames.SetFetchStatus,
  SetFetchStatusPayload
>

export function initMotionManager(
  payload: InitAssistantPayload
): InitAssistantAction {
  return {
    type: ActionNames.InitAssistant,
    payload
  }
}

export function setVRMConfig(payload: SetVRMConfigPayload): SetVRMConfigAction {
  return {
    type: ActionNames.SetVRMConfig,
    payload
  }
}

export function setFetchStatus(
  payload: SetFetchStatusPayload
): SetFetchStatusAction {
  return {
    type: ActionNames.SetFetchStatus,
    payload
  }
}
