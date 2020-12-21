import { OperationType, ReplyMapType } from './type'
import { SupportLang, getUserLang, toMessageVO } from '../utils'
import { isBetweenHour } from 'utils/datetime'

type LocaleReplyMapType = {
  ja: ReplyMapType
  en: ReplyMapType
}

const entityMap: LocaleReplyMapType = {
  ja: {
    [OperationType.Greeting]: [],
    [OperationType.Hungry]: ['私もお腹空きました']
  },
  en: {
    [OperationType.Greeting]: [],
    [OperationType.Hungry]: ["I'm hungry too."]
  }
}

export const getReplyMessageVO = (operationType: OperationType) => {
  const lang = getUserLang()
  if (operationType === OperationType.Greeting) {
    const message = getReplyGreeting(lang)
    return toMessageVO(message)
  }

  const replyMessageMap = entityMap[lang]
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
  },
  en: {
    Morning: ['Good morning!!', "How's it going"],
    Afternoon: ['Hello', 'Hi!', 'Good afternoon'],
    Evening: ['Good evening'],
    Night: ['Good night']
  }
}

const getReplyGreeting = (lang: SupportLang) => {
  const replyGreetings = localeReplyGreeting[lang]
  const date = new Date()
  const candidates =
    isBetweenHour(date, 0, 5) || isBetweenHour(date, 22, 24)
      ? replyGreetings.Night
      : isBetweenHour(date, 5, 10)
      ? replyGreetings.Morning
      : isBetweenHour(date, 18, 22)
      ? replyGreetings.Evening
      : replyGreetings.Afternoon

  const randomIndex = Math.floor(Math.random() * candidates.length)
  return candidates[randomIndex]
}
