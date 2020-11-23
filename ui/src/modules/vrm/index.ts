import { Assistant } from 'models/assistant/Assistant'
import { Vector3 } from 'three'

export * from './actions'
export * from './reducers'
export * from './selectors'

export interface State {
  vrmPath: string
  assistant: Assistant | null
  camera: {
    position: Vector3,
    target: Vector3 
  }
}

export const initialState: State = {
  vrmPath: '',
  assistant: null,
  camera: {
    position: new Vector3(0, 0, 0),
    target: new Vector3(0, 0, 0)
  }
}
