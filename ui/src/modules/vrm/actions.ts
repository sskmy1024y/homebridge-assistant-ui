import { TypedAction } from 'utils/redux'
import { VRM } from '@pixiv/three-vrm'

export enum ActionNames {
  InitAssistant = 'INIT_ASSISTANT',
  SetVRMConfig = 'SET_VRM_CONFIG'
}

export type Action = InitAssistantAction | SetVRMConfigAction

interface InitAssistantPayload {
  vrm: VRM
}

interface SetVRMConfigPayload {
  vrmPath: string
  camera: {
    position: {
      x: number,
      y: number,
      z: number
    },
    target: {
      x: number,
      y: number,
      z: number
    }
  }
}

export type InitAssistantAction = TypedAction<
  ActionNames.InitAssistant,
  InitAssistantPayload
>

export type SetVRMConfigAction = TypedAction<ActionNames.SetVRMConfig, SetVRMConfigPayload>

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
