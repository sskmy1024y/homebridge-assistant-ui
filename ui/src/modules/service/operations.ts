import { ServiceNS } from 'models/services'
import { State } from '.'

/**
 * Find the accessory with the name in the user message
 *
 * @param userMessage
 * @param state State of Service module
 */
export const findIncludedAccessory = (
  userMessage: string,
  state: State[ServiceNS.Accessories]
) => {
  const accessories = state.values()
  for (const accessory of accessories) {
    if (userMessage.indexOf(accessory.serviceName) !== -1) {
      return accessory
    }
  }
}
