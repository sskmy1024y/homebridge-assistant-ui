import { ErrorMapType, ErrorType } from './type'
import { getUserLang, interpolate, toMessageVO } from '../utils'

type LocaleErrorMapType = {
  ja: ErrorMapType
  en: ErrorMapType
}

const errorMap: LocaleErrorMapType = {
  ja: {
    [ErrorType.UnknownError]: [
      'すみません、よくわかりません',
      '別の言葉で言い直してください'
    ]
  },
  en: {
    [ErrorType.UnknownError]: ['Sorry, I cannot understand.']
  }
}

const getLocaleErrorMap = () => {
  const language = getUserLang()
  return errorMap[language]
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
