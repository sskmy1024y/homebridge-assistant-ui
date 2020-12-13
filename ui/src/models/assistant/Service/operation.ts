import { Accessory } from 'models/accessories/Accessory'
import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { ServiceEvent } from 'models/services'
import { WsService } from 'models/WsService'

import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { Dispatch } from 'modules/reducer'
import { ErrorType, OperationType } from './type'
import { MotionManager } from 'utils/MotionManager'
import { getErrorMessageVO } from './error'
import { getReplyMessageVO } from './reply'
import { sendAssistantMessage } from 'modules/messages'

const TIMEOUT_OFFSET = 1500

/**
 * Operate according to the accessory type and the user's instructions.
 * Returns true if there is a matching pattern, false otherwise.
 *
 * @param accessory
 * @param operationType
 * @param successMessage
 * @param ws
 */
export const runOperation = (
  operationType: OperationType,
  accessory: Accessory,
  motionManager: MotionManager | undefined,
  ws: WsService,
  dispatch: Dispatch
) => {
  // Declare what to do when a request times out
  const timeout = setTimeout(() => {
    const messageVO = getErrorMessageVO(ErrorType.OperationTimeoutError)
    motionManager?.animate(AnimationPreset.Think)
    dispatch(sendAssistantMessage({ messageVO }))
  }, TIMEOUT_OFFSET)

  // Calculate the time from the time of the event to the timeout
  const timeoutLimit = Date.now() + TIMEOUT_OFFSET

  // Declare a function to execute on success
  const onSuccess = () => {
    if (Date.now() < timeoutLimit) {
      const messageVO = getReplyMessageVO(operationType, accessory.serviceName)

      motionManager?.animate(AnimationPreset.Salute)
      dispatch(sendAssistantMessage({ messageVO }))
      clearTimeout(timeout)
    }
  }

  switch (accessory.type) {
    case HomeKitTypes.Switch: {
      switch (operationType) {
        case OperationType.TurnOff: {
          accessory.updateValue(false, ws)
          ws.socket.once(ServiceEvent.accessories.AccessoriesData, onSuccess)
          return true
        }
        case OperationType.TurnOn: {
          accessory.updateValue(true, ws)
          ws.socket.once(ServiceEvent.accessories.AccessoriesData, onSuccess)
          return true
        }
      }
    }
  }
  return false
}
