import { Action, AnyAction } from 'redux'
import { RootState } from 'modules/reducer'
import { ThunkDispatch } from 'redux-thunk'

export interface TypedAction<A extends string, T> {
  type: A
  payload: T
}

export type ThunkAction<R, S, A extends Action = AnyAction> = (
  dispatch: ThunkDispatch<S, never, A>,
  getState: () => S
) => R

export type ThunkActionType = ThunkAction<void, RootState, Action>
