import * as Auth from './auth'
import * as Layout from './layout'
import * as Messages from './messages'
import * as Service from './service'
import * as VRM from './vrm'
import * as Ws from './ws'
import * as redux from 'redux'
import { ThunkDispatch } from 'redux-thunk'

export interface RootState {
  auth: Auth.State
  layout: Layout.State
  ws: Ws.State
  vrm: VRM.State
  service: Service.State
  messages: Messages.State
}

export const initialState: RootState = {
  auth: Auth.initialState,
  layout: Layout.initialState,
  ws: Ws.initialState,
  vrm: VRM.initialState,
  service: Service.initialState,
  messages: Messages.initialState
}

export type Dispatch = ThunkDispatch<RootState, never, redux.AnyAction>

export const rootReducer = redux.combineReducers<RootState>({
  auth: Auth.reducer,
  layout: Layout.reducer,
  ws: Ws.reducer,
  vrm: VRM.reducer,
  service: Service.reducer,
  messages: Messages.reducer
})
