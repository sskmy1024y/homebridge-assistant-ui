import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { OperationType } from './type'
import { ServiceNS } from 'models/services'
import { State } from 'modules/service'

/**
 * Guess what accessory information you need.
 *
 * @param operation
 * @param state
 */
export const guessAccessory = (
  operation: OperationType,
  state: State[ServiceNS.Accessories]
) => {
  const accessories = state.values()

  switch (operation) {
    case (OperationType.TurnOn, OperationType.TurnOff): {
      for (const accessory of accessories) {
        if (accessory.humanType === HomeKitTypes.Switch) {
          return accessory
        }
      }
      return undefined
    }
    case OperationType.Templature: {
      // TODO: Determine if it is indoor or outdoor temperature.
      for (const accessory of accessories) {
        if (accessory.humanType === HomeKitTypes.TemperatureSensor) {
          return accessory
        }
      }
      return undefined
    }
  }
}
