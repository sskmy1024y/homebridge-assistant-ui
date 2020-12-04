import { TypedAction } from 'utils/redux'

export enum ActionNames {
  SetLayout = 'SET_LAYOUT'
}

export type Action = SetLayoutAction

interface SetLayoutPayload {
  accessoryUUID: string
  width: number
  height: number
  x: number
  y: number
}

export type SetLayoutAction = TypedAction<
  ActionNames.SetLayout,
  SetLayoutPayload
>

export function setLayout(payload: SetLayoutPayload): SetLayoutAction {
  return {
    type: ActionNames.SetLayout,
    payload
  }
}
