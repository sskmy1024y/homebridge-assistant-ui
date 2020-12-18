import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { Dispatch } from 'modules/reducer'
import { MotionManager } from 'utils/MotionManager'
import { OperationType } from './type'
import { getReplyMessageVO } from './reply'
import { sendAssistantMessage } from 'modules/messages'

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
      motionManager?.animate(AnimationPreset.WaveHand)
      dispatch(sendAssistantMessage({ messageVO }))
      return true
    }
    case OperationType.Hungry: {
      const messageVO = getReplyMessageVO(operationType)
      motionManager?.animate(AnimationPreset.Think)
      dispatch(sendAssistantMessage({ messageVO }))
      return true
    }
  }
}
