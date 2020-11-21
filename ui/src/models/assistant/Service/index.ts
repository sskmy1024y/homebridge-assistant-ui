import { Dispatch } from 'redux'
import { RootState } from 'modules/reducer'
import { ServiceNS } from 'models/services'
import { connectToNamespace } from 'modules/ws'
import { findIncludedAccessory } from 'modules/service/operations'

import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { ErrorType, OperationType } from './type'
import { addMessage } from 'modules/messages'
import { getEntityMap } from './entity'
import { getErrorMessageVO } from './error'
import { runOperation } from './operation'

interface FindOperationState {
  findEntity: string
  operationType: OperationType
}

const findOperationByEntity = (sentence: string) => {
  const entityMap = getEntityMap()
  for (const [operationType, entities] of Object.entries(entityMap)) {
    for (const entity of entities) {
      if (sentence.indexOf(entity) !== -1) {
        return {
          findEntity: entity,
          operationType
        } as FindOperationState
      }
    }
  }
}

/**
 * The execution function that processes the action.
 *
 * Regardless of whether the operation was successful or not, it returns true if the corresponding entity was found.
 * If not, it returns false and goes to find another action.
 *
 * @param userMessage Message sent by user
 * @param rootState
 * @param dispatch
 * @returns Whether to continue action's process.
 */
export const run = (
  userMessage: string,
  rootState: RootState,
  dispatch: Dispatch
) => {
  const findOperation = findOperationByEntity(userMessage)
  if (findOperation === undefined) return false

  const { operationType } = findOperation
  const wsService = connectToNamespace(
    ServiceNS.Accessories,
    rootState.ws,
    rootState.auth.token,
    dispatch
  )

  if (wsService === null || wsService.connected === undefined) {
    return true
  }

  const accerrosiesState = rootState.service.accessories
  const motionManager = rootState.vrm.assistant?.motionManager
  const findAccessory = findIncludedAccessory(userMessage, accerrosiesState)

  if (findAccessory === undefined) {
    const messageVO = getErrorMessageVO(ErrorType.AccessoryNotFoundError)
    motionManager?.animate(AnimationPreset.Think)
    dispatch(addMessage({ messageVO }))
    return true
  }

  const result = runOperation(
    operationType,
    findAccessory,
    motionManager,
    wsService,
    dispatch
  )

  if (!result) {
    const messageVO = getErrorMessageVO(ErrorType.OperationNotFoundError)
    motionManager?.animate(AnimationPreset.Think)
    dispatch(addMessage({ messageVO }))
  }
  return true
}
