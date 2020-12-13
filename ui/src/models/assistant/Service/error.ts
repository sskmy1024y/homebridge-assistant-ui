import { ErrorMapType, ErrorType } from './type'
import { getUserLang, interpolate, toMessageVO } from '../utils'

type LocaleErrorMapType = {
  ja: ErrorMapType
  en: ErrorMapType
}

const errorMap: LocaleErrorMapType = {
  ja: {
    [ErrorType.AccessoryNotFoundError]: [
      'デバイスが見つかりませんでした',
      '指定された名前のデバイスが見つかりませんでした'
    ],
    [ErrorType.OperationNotFoundError]: [
      '指定された操作方法がわかりませんでした',
      'すみません、その操作はできません'
    ],
    [ErrorType.WsConnectionError]: [
      'homebridgeの接続に失敗しました',
      'ネットワークエラ〜が発生しました'
    ],
    [ErrorType.OperationTimeoutError]: [
      'デバイスが応答しませんでした',
      'しばらくしてから、もう一度お試しください'
    ],
    [ErrorType.UnknownError]: ['']
  },
  en: {
    [ErrorType.AccessoryNotFoundError]: [
      'Device not found,',
      'The device with the specified name was not found'
    ],
    [ErrorType.OperationNotFoundError]: [
      "I didn't understand the specified operation method",
      "I'm sorry, I can't do that"
    ],
    [ErrorType.WsConnectionError]: [
      'Homebridge connection failed',
      'Network error has occurred'
    ],
    [ErrorType.OperationTimeoutError]: [
      'The device did not respond',
      'しばらくしてから、もう一度お試しください'
    ],
    [ErrorType.UnknownError]: ['Please try again after a while']
  }
}

const getLocaleErrorMap = () => {
  const lang = getUserLang()
  return errorMap[lang]
}

export const getErrorMessageVO = (
  errorType: ErrorType,
  deviceName?: string
) => {
  const errorMessageMap = getLocaleErrorMap()
  const messageMap = errorMessageMap[errorType]

  const randomIndex = Math.floor(Math.random() * messageMap.length)

  const message = deviceName
    ? interpolate(messageMap[randomIndex], {
        DEVICE_NAME: deviceName
      })
    : messageMap[randomIndex]

  return toMessageVO(message)
}
