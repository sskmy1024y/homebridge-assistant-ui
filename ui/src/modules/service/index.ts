import { Accessory } from 'models/accessories/Accessory'
import { ServiceNS } from 'models/services/namespace'

export * from './actions'
export * from './reducers'

export type State = {
  // TODO: [namespace in ServiceNS]?: []
  [ServiceNS.Accessories]: Map<string, Accessory>
}

export const initialState: State = {
  [ServiceNS.Accessories]: new Map<string, Accessory>()
}
