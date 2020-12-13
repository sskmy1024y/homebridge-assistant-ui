import { EntityMapType, OperationType } from './type'
import { getUserLang } from '../utils'

type LocaleEntityMapType = {
  ja: EntityMapType
  en: EntityMapType
}

const entityMap: LocaleEntityMapType = {
  ja: {
    [OperationType.TurnOff]: ['消して', 'けして', '決して', '消せ', 'けせ'],
    [OperationType.TurnOn]: ['つけて', '付けて', '点けて', 'つけろ']
  },
  en: {
    [OperationType.TurnOff]: ['off', 'turn off'],
    [OperationType.TurnOn]: ['turn on', 'on']
  }
}

export const getEntityMap = () => {
  const lang = getUserLang()
  return entityMap[lang]
}
