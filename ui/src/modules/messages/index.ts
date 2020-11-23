import { MessageVO } from 'models/ui/messageVO'

export * from './actions'
export * from './reducers'
export * from './operations'

export type State = {
  messages: MessageVO[]
}

export const initialState: State = {
  messages: []
}
