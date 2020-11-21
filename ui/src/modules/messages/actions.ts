import { MessageVO } from 'models/ui/messageVO'
import { TypedAction } from 'utils/redux'

export enum ActionNames {
  AddMessage = 'ADD_MESSAGE'
}

export type Action = AddMessageAction

interface Payload {
  messageVO: MessageVO
}

export type AddMessageAction = TypedAction<ActionNames.AddMessage, Payload>

export function addMessage(payload: Payload): AddMessageAction {
  return {
    type: ActionNames.AddMessage,
    payload
  }
}
