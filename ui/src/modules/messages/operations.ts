import { MessageVO } from 'models/ui/messageVO'
import { ThunkActionType } from 'utils/redux'
import { addMessage } from './actions'

interface SendMessagePayload {
  message: string
}

export const sendMessage = ({
  message
}: SendMessagePayload): ThunkActionType => async (dispatch, getState) => {
  const rootState = getState()
  const { assistant } = rootState.vrm
  const messageVO: MessageVO = {
    message,
    sender: 'user',
    timestamp: Date.now()
  }

  dispatch(addMessage({ messageVO }))

  if (assistant === null) return

  assistant.action(message, rootState, dispatch)
}
