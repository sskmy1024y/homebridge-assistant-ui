import { MessageVO } from 'models/ui/messageVO'
import { ThunkActionType } from 'utils/redux'
import { addMessage } from './actions'
import { sendMessageLog } from 'api/log'

interface SendMessagePayload {
  message: string
}

export const sendUserMessage = ({
  message
}: SendMessagePayload): ThunkActionType => async (dispatch, getState) => {
  const rootState = getState()
  const { assistant } = rootState.vrm
  const messageVO: MessageVO = {
    message,
    sender: 'user',
    timestamp: Date.now()
  }

  await sendMessageLog(messageVO.sender, messageVO.message)
  dispatch(addMessage({ messageVO }))

  if (assistant === null) return
  assistant.action(message, rootState, dispatch)
}

export const sendAssistantMessage = ({
  messageVO
}: {
  messageVO: MessageVO
}): ThunkActionType => async dispatch => {
  dispatch(addMessage({ messageVO }))
  await sendMessageLog(messageVO.sender, messageVO.message)
}
