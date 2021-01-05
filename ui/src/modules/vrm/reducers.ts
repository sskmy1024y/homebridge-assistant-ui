import { Action, ActionNames, State, initialState } from '.'
import { Assistant } from 'models/assistant/Assistant'
import { Vector3 } from 'three'

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case ActionNames.InitAssistant: {
      return {
        ...state,
        assistant: new Assistant(action.payload.vrm)
      }
    }
    case ActionNames.SetVRMConfig: {
      return {
        ...state,
        vrmPath: action.payload.vrmPath,
        camera: {
          position: new Vector3(
            action.payload.camera.position.x,
            action.payload.camera.position.y,
            action.payload.camera.position.z
          ),
          target: new Vector3(
            action.payload.camera.target.x,
            action.payload.camera.target.y,
            action.payload.camera.target.z
          )
        }
      }
    }
    case ActionNames.SetFetchStatus: {
      return {
        ...state,
        fetchStatus: action.payload.status
      }
    }
    default:
      return state
  }
}
