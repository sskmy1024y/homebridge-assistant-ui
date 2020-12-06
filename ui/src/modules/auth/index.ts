export * from './actions'
export * from './reducers'
export * from './operations'
export * from './selectors'

export interface State {
  userId: string | null
  host: string | null
  token: string | null
  expire: number
}

export const initialState: State = {
  userId: null,
  host: null,
  token: null,
  expire: 0
}
