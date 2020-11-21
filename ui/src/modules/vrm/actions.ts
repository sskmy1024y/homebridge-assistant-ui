import { TypedAction } from 'utils/redux'
import { VRM } from '@pixiv/three-vrm'

export enum ActionNames {
  InitAssistant = 'INIT_ASSISTANT'
}

export type Action = InitAssistantAction

interface InitAssistantPayload {
  vrm: VRM
}

export type InitAssistantAction = TypedAction<
  ActionNames.InitAssistant,
  InitAssistantPayload
>

export function initMotionManager(
  payload: InitAssistantPayload
): InitAssistantAction {
  return {
    type: ActionNames.InitAssistant,
    payload
  }
}
