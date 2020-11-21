import { ErrorMapType, ErrorType } from './type'
import { interpolate, toMessageVO } from '../utils'

type LocaleErrorMapType = {
  ja: ErrorMapType
}

const errorMap: LocaleErrorMapType = {
  ja: {
    [ErrorType.UnknownError]: ['すみません、よくわかりません']
  }
}

const getLocaleErrorMap = () => {
  // TODO: Change the entities returned by language
  return errorMap.ja
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
