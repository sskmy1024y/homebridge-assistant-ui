import * as Service from './Service'
import * as Talk from './Talk'
import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { Dispatch, RootState } from 'modules/reducer'
import { getUserLang, toMessageVO } from './utils'
import { sendAssistantMessage } from 'modules/messages'

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
  en: string[]
}

const entityMap: LocaleActionNotFoundErrorType = {
  ja: ['すみません、よくわかりません'],
  en: ["sorry, I'm not sure"]
}

const actionNotFound = (rootState: RootState, dispatch: Dispatch) => {
  const lang = getUserLang()
  const motionManager = rootState.vrm.assistant?.motionManager
  const replyMessageMap = entityMap[lang]
  const randomIndex = Math.floor(Math.random() * replyMessageMap.length)
  const messageVO = toMessageVO(replyMessageMap[randomIndex])

  if (motionManager) {
    motionManager.animate(AnimationPreset.Think)
  }

  dispatch(sendAssistantMessage({ messageVO }))
}
