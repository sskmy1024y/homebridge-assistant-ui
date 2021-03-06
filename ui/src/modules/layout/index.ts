export * from './actions'
export * from './reducers'

interface LayoutState {
  width: number
  height: number
  x: number
  y: number
}

export type State = {
  [accessoryUUID: string]: LayoutState
}

export const initialState: State = {}
