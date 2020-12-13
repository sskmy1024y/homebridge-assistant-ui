import { EntityMapType, OperationType } from './type'
import { getUserLang } from '../utils'

type LocaleEntityMapType = {
  ja: EntityMapType
  en: EntityMapType
}

const entityMap: LocaleEntityMapType = {
  ja: {
    [OperationType.Greeting]: [
      'おはよ',
      'お早う',
      'こんにちは',
      'こんばんは',
      'やあ',
      'どうも'
    ],
    [OperationType.Hungry]: [
      '腹すいた',
      'はらへった',
      '腹減った',
      '腹へった',
      'はら減った',
      'はらへった',
      'おなか空いた',
      'おなかすいた'
    ]
  },
  en: {
    [OperationType.Greeting]: [
      'hi',
      'hello',
      'good morning',
      'good evening',
      'good night'
    ],
    [OperationType.Hungry]: ['hungry']
  }
}

export const getEntityMap = () => {
  const language = getUserLang()
  return entityMap[language]
}
