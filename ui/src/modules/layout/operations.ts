import { ThunkActionType } from 'utils/redux'
import { setLayout } from './actions'

export const updateLayout = (payload: {
  accessoryUUID: string
  width: number
  height: number
  x: number
  y: number
}): ThunkActionType => async dispatch => {
  // APIに通信する
  dispatch(setLayout(payload))
}
