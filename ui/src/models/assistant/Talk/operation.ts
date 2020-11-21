import { Dispatch } from 'redux'

import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { MotionManager } from 'utils/MotionManager'
import { OperationType } from './type'
import { addMessage } from 'modules/messages'
import { getReplyMessageVO } from './reply'

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
  motionManager: MotionManager | undefined,
  dispatch: Dispatch
) => {
  const messageVO = getReplyMessageVO(operationType)

  switch (operationType) {
    case OperationType.Greeting: {
      motionManager?.animate(AnimationPreset.Salute)
      dispatch(addMessage({ messageVO }))
      return true
    }
    case OperationType.Hungry: {
      const messageVO = getReplyMessageVO(operationType)
      motionManager?.animate(AnimationPreset.Salute)
      dispatch(addMessage({ messageVO }))
      return true
    }
  }
}
