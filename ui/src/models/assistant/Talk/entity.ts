import { EntityMapType, OperationType } from './type'

type LocaleEntityMapType = {
  ja: EntityMapType
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
  }
}

export const getEntityMap = () => {
  // TODO: Change the entities returned by language
  return entityMap.ja
}
