import * as Service from './Service'
import * as Talk from './Talk'
import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { Dispatch } from 'redux'
import { RootState } from 'modules/reducer'
import { addMessage } from 'modules/messages'
import { toMessageVO } from './utils'

const runActionList = [Service.run, Talk.run]

export const resolveAction = (
  userMessage: string,
  rootState: RootState,
  dispatch: Dispatch
) => {
  for (const run of runActionList) {
    const result = run(userMessage, rootState, dispatch)
    if (result) {
      return true
    }
  }

  actionNotFound(rootState, dispatch)
  return false
}

type LocaleActionNotFoundErrorType = {
  ja: string[]
}

const entityMap: LocaleActionNotFoundErrorType = {
  ja: ['すみません、よくわかりません']
}

const actionNotFound = (rootState: RootState, dispatch: Dispatch) => {
  const motionManager = rootState.vrm.assistant?.motionManager
  const replyMessageMap = entityMap.ja
  const randomIndex = Math.floor(Math.random() * replyMessageMap.length)
  const messageVO = toMessageVO(replyMessageMap[randomIndex])

  if (motionManager) {
    motionManager.animate(AnimationPreset.Think)
  }

  dispatch(addMessage({ messageVO }))
}
