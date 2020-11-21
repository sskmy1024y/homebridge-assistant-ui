import * as Auth from './auth'
import * as Messages from './messages'
import * as Service from './service'
import * as VRM from './vrm'
import * as Ws from './ws'
import * as redux from 'redux'

export interface RootState {
  auth: Auth.State
  ws: Ws.State
  vrm: VRM.State
  service: Service.State
  messages: Messages.State
}

export const initialState: RootState = {
  auth: Auth.initialState,
  ws: Ws.initialState,
  vrm: VRM.initialState,
  service: Service.initialState,
  messages: Messages.initialState
}

export const rootReducer = redux.combineReducers<RootState>({
  auth: Auth.reducer,
  ws: Ws.reducer,
  vrm: VRM.reducer,
  service: Service.reducer,
  messages: Messages.reducer
})
