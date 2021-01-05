import { EntityMapType, OperationType } from './type'
import { getUserLang } from '../utils'

type LocaleEntityMapType = {
  ja: EntityMapType
  en: EntityMapType
}

const entityMap: LocaleEntityMapType = {
  ja: {
    [OperationType.TurnOff]: [
      '消して',
      'けして',
      '決して',
      '消せ',
      'けせ',
      'オフにして'
    ],
    [OperationType.TurnOn]: [
      'つけて',
      '付けて',
      '点けて',
      'つけろ',
      'オンにして'
    ],
    [OperationType.Templature]: [
      '部屋の室温',
      '部屋の気温',
      '部屋の温度',
      '気温',
      '室温',
      '温度'
    ],
    [OperationType.Humidity]: ['部屋の湿度', '湿度', '湿り気']
  },
  en: {
    [OperationType.TurnOff]: ['off', 'turn off'],
    [OperationType.TurnOn]: ['turn on', 'on'],
    [OperationType.Templature]: ['Room temperature', 'temperature'],
    [OperationType.Humidity]: ['Current humidity', 'humidity']
  }
}

export const getEntityMap = () => {
  const lang = getUserLang()
  return entityMap[lang]
}
