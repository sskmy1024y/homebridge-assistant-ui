import { OperationType, ReplyMapType } from './type'
import { getUserLang, interpolate, toMessageVO } from '../utils'

type LocaleReplyMapType = {
  ja: ReplyMapType
  en: ReplyMapType
}

const entityMap: LocaleReplyMapType = {
  ja: {
    [OperationType.TurnOff]: [
      '{{ DEVICE_NAME }}を消しました',
      '了解しました！',
      '了解です'
    ],
    [OperationType.TurnOn]: [
      '{{ DEVICE_NAME }}をつけました',
      '了解しました！',
      '了解です'
    ],
    [OperationType.Templature]: ['現在の気温は{{ TEMP }}です', '{{ TEMP }}です']
  },
  en: {
    [OperationType.TurnOff]: [
      'I turned off the {{ DEVICE_NAME }}',
      'OK!',
      'I did it'
    ],
    [OperationType.TurnOn]: [
      'I turned on the {{ DEVICE_NAME }}',
      'OK!',
      'I did it'
    ],
    [OperationType.Templature]: [
      'Current temperature is {{ TEMP }}',
      '{{ TEMP }}'
    ]
  }
}

export const getReplyMessageVO = (
  operationType: OperationType,
  interpolateValue: {
    [key: string]: string
  }
) => {
  const lang = getUserLang()
  const replyMessageMap = entityMap[lang]
  const messageMap = replyMessageMap[operationType]

  const randomIndex = Math.floor(Math.random() * messageMap.length)

  const message = interpolate(messageMap[randomIndex], interpolateValue)

  return toMessageVO(message)
}
