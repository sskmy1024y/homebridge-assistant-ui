export * from './actions'
export * from './reducers'
export * from './operations'
export * from './selectors'

export interface State {
  host: string | null
  token: string | null
  expire: number
}

export const initialState: State = {
  host: null,
  token: null,
  expire: 0
}
