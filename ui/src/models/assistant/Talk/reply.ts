import { OperationType, ReplyMapType } from './type'
import { isBetweenHour } from 'utils/datetime'
import { toMessageVO } from '../utils'

type LocaleReplyMapType = {
  ja: ReplyMapType
}

const entityMap: LocaleReplyMapType = {
  ja: {
    [OperationType.Greeting]: [],
    [OperationType.Hungry]: ['私もお腹空きました']
  }
}

export const getReplyMessageVO = (operationType: OperationType) => {
  if (operationType === OperationType.Greeting) {
    const message = getReplyGreeting('ja')
    return toMessageVO(message)
  }

  const replyMessageMap = entityMap.ja
  const messageMap = replyMessageMap[operationType]
  const randomIndex = Math.floor(Math.random() * messageMap.length)
  const message = messageMap[randomIndex]

  return toMessageVO(message)
}

const localeReplyGreeting = {
  ja: {
    Morning: ['おはようございます', 'おはようございます'],
    Afternoon: ['こんにちは'],
    Evening: ['こんばんは'],
    Night: ['おやすみなさい']
  }
}

const getReplyGreeting = (lang: 'ja') => {
  const replyGreetings = localeReplyGreeting[lang]
  const date = new Date()
  if (isBetweenHour(date, 0, 5) || isBetweenHour(date, 18, 24)) {
    const candidates = replyGreetings.Night
    const randomIndex = Math.floor(Math.random() * candidates.length)
    return candidates[randomIndex]
  } else {
    const candidates = replyGreetings.Morning
    const randomIndex = Math.floor(Math.random() * candidates.length)
    return candidates[randomIndex]
  }
}
