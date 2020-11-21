export * from './actions'
export * from './reducers'
export * from './operations'
export * from './selectors'

export interface State {
  token: string | null
  expire: number
}

export const initialState: State = {
  token: null,
  expire: 0
}
