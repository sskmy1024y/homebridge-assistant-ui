import { Assistant } from 'models/assistant/Assistant'

export * from './actions'
export * from './reducers'
export * from './selectors'

export interface State {
  vrmPath: string
  assistant: Assistant | null
}

export const initialState: State = {
  vrmPath: '',
  assistant: null
}
