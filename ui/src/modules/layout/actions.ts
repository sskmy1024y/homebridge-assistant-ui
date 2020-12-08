import { TypedAction } from 'utils/redux'

export enum ActionNames {
  SetLayout = 'SET_LAYOUT',
  SetLayouts = 'SET_LAYOUTS'
}

export type Action = SetLayoutAction | SetLayoutsAction

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

interface SetLayoutsPayload {
  [accessoryUUID: string]: {
    width: number
    height: number
    x: number
    y: number
  }
}

export type SetLayoutsAction = TypedAction<
  ActionNames.SetLayouts,
  SetLayoutsPayload
>

export function setLayout(payload: SetLayoutPayload): SetLayoutAction {
  return {
    type: ActionNames.SetLayout,
    payload
  }
}

export function setLayouts(payload: SetLayoutsPayload): SetLayoutsAction {
  return {
    type: ActionNames.SetLayouts,
    payload
  }
}
