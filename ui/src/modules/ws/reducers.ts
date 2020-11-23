import { Action, ActionNames, State, initialState } from '.'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.SetSocket: {
      const { namespace, wsService } = action.payload
      return {
        ...state,
        namespaceConnectionCache: {
          ...state.namespaceConnectionCache,
          [namespace]: wsService
        }
      }
    }
    default:
      return state
  }
}
