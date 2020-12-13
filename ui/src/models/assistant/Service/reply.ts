import { OperationType, ReplyMapType } from './type'
import { interpolate, toMessageVO } from '../utils'

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
      '了解です',
      '了解です'
    ]
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
    ]
  }
}

export const getReplyMessageVO = (
  operationType: OperationType,
  deviceName: string
) => {
  const replyMessageMap = entityMap.ja
  const messageMap = replyMessageMap[operationType]

  const randomIndex = Math.floor(Math.random() * messageMap.length)

  const message = interpolate(messageMap[randomIndex], {
    DEVICE_NAME: deviceName
  })

  return toMessageVO(message)
}
