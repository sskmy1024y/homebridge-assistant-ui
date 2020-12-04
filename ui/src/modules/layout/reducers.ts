import { Action, ActionNames, State, initialState } from '.'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.SetLayout: {
      const {accessoryUUID, width, height, x, y} = action.payload
      return {
        ...state,
        [accessoryUUID]: {
          width, height, x, y
        }
      }
    }
    default:
      return state
  }
}
