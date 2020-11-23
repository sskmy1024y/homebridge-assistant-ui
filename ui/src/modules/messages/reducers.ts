import { Action, ActionNames, State, initialState } from '.'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.AddMessage: {
      return {
        ...state,
        messages: [...state.messages, action.payload.messageVO]
      }
    }
    default:
      return state
  }
}
