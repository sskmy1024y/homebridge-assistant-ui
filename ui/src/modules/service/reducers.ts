import { Action, ActionNames, State, initialState } from '.'
import { HomeKitTypes } from 'models/accessories/HomeKitTypes'
import { ServiceNS } from 'models/services'
import { Switch, SwitchType } from 'models/accessories/Switch'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.SetServiceResponse: {
      const { namespace, response } = action.payload
      if (namespace === ServiceNS.Accessories) {
        const nextState = new Map(state[namespace])
        response.forEach(accessory => {
          switch (accessory.type) {
            case HomeKitTypes.Switch: {
              nextState.set(accessory.uuid, new Switch(accessory as SwitchType))
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
