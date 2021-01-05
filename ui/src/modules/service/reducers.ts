import { Action, ActionNames, State, initialState } from '.'
import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { Humidity, HumidityType } from 'models/accessories/Humidity'
import { ServiceNS } from 'models/services'
import { Switch, SwitchType } from 'models/accessories/Switch'
import { Templature, TemplatureType } from 'models/accessories/Templature'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.SetServiceResponse: {
      const { namespace, response } = action.payload
      if (namespace === ServiceNS.Accessories) {
        const nextState = new Map(state[namespace])
        response.forEach(accessory => {
          switch (accessory.humanType) {
            case HomeKitTypes.Switch: {
              nextState.set(accessory.uuid, new Switch(accessory as SwitchType))
              break
            }
            case HomeKitTypes.TemperatureSensor: {
              nextState.set(
                accessory.uuid,
                new Templature(accessory as TemplatureType)
              )
              break
            }
            case HomeKitTypes.HumiditySensor: {
              nextState.set(
                accessory.uuid,
                new Humidity(accessory as HumidityType)
              )
              break
            }
          }
        })
        return {
          ...state,
          [namespace]: nextState
        }
      }
      return {
        ...state,
        [namespace]: response
      }
    }
    default:
      return state
  }
}
