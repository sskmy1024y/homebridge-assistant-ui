import { ServiceNS } from 'models/services/namespace'
import { WsService } from 'models/WsService'

export * from './actions'
export * from './reducers'
export * from './operations'
export * from './selectors'

export interface State {
  namespaceConnectionCache: {
    [namespace in ServiceNS]?: WsService
  }
}

export const initialState: State = {
  namespaceConnectionCache: {}
}
