import { ThunkActionType } from 'utils/redux'
import { fetchAccessoryLayout, updateAccessoryLayout } from 'api/layout'
import { setLayout, setLayouts } from './actions'

export const fetchLayout = (
  userId: string
): ThunkActionType => async dispatch => {
  const result = await fetchAccessoryLayout(userId)

  if (result) {
    dispatch(setLayouts(result))
  }
}

export const updateLayout = ({
  userId,
  accessoryUUID,
  width,
  height,
  x,
  y
}: {
  userId: string
  accessoryUUID: string
  width: number
  height: number
  x: number
  y: number
}): ThunkActionType => async dispatch => {
  await updateAccessoryLayout(userId, accessoryUUID, { width, height, x, y })
  dispatch(setLayout({ accessoryUUID, width, height, x, y }))
}
