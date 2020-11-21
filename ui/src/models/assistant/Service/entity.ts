import { EntityMapType, OperationType } from './type'

type LocaleEntityMapType = {
  ja: EntityMapType
}

const entityMap: LocaleEntityMapType = {
  ja: {
    [OperationType.TurnOff]: ['消して', 'けして', '決して', '消せ', 'けせ'],
    [OperationType.TurnOn]: ['つけて', '付けて', '点けて', 'つけろ']
  }
}

export const getEntityMap = () => {
  // TODO: Change the entities returned by language
  return entityMap.ja
}
