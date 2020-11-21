import { isBetweenHour } from 'utils/datetime'

export namespace TalkAction {
  /** ActionName: Name of action type */
  export const ActionName = 'TALK_ACTION'
  export type ActionName = typeof ActionName

  /** OperationType: Name of the operation to perform */
  export const OperationType = {
    Greeting: 'GREETING'
  } as const
  export type OperationType = typeof OperationType[keyof typeof OperationType]

  /** EntityMay: Map of the corresponding Entity */
  export type EntityMap = Map<OperationType, string[]>

  // ==========================

  const localeEntities: { ja: EntityMap } = {
    ja: new Map([
      [
        OperationType.Greeting,
        ['おはよ', 'お早う', 'こんにちは', 'こんばんは', 'やあ', 'どうも']
      ]
    ])
  }

  export const getEntityMap = () => {
    // TODO: Change the entities returned by language
    return localeEntities.ja
  }

  type State = {
    actionName: ActionName
    entity: string
    operationType: OperationType
  }

  export const findOperationByEntity = (sentence: string) => {
    const entityMap = getEntityMap()
    for (const [operationType, entities] of entityMap) {
      for (const entity of entities) {
        if (sentence.indexOf(entity) !== -1) {
          return {
            actionName: ActionName,
            entity,
            operationType
          } as State
        }
      }
    }
  }

  const localeReplyMesseges: { ja: EntityMap } = {
    ja: new Map([[OperationType.Greeting, []]])
  }

  export const replyMessage = (operationType: OperationType) => {
    const replyMessageMap = localeReplyMesseges.ja
    const messageMap = replyMessageMap.get(operationType)

    if (!messageMap) return ''

    if (operationType === OperationType.Greeting) {
      return getReplyGreeting('ja') // TODO: localize
    }

    const randomIndex = Math.floor(Math.random() * messageMap.length)

    return messageMap[randomIndex]
  }

  const localeReplyGreeting = {
    ja: {
      Morning: ['おはようございます', 'おはようございます'],
      Afternoon: ['こんにちは'],
      Evening: ['こんばんは'],
      Night: ['おやすみなさい']
    }
  }

  const getReplyGreeting = (lang: 'ja') => {
    const replyGreetings = localeReplyGreeting[lang]
    const date = new Date()
    if (isBetweenHour(date, 0, 5) || isBetweenHour(date, 18, 24)) {
      const candidates = replyGreetings.Night
      const randomIndex = Math.floor(Math.random() * candidates.length)
      return candidates[randomIndex]
    } else {
      const candidates = replyGreetings.Morning
      const randomIndex = Math.floor(Math.random() * candidates.length)
      return candidates[randomIndex]
    }
  }
}
