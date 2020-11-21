import { Action, ActionNames, State, initialState } from '.'
import { Assistant } from 'models/assistant/Assistant'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.InitAssistant: {
      return {
        ...state,
        assistant: new Assistant(action.payload.vrm)
      }
    }
    default:
      return state
  }
}
