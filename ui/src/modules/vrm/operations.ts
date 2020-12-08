import { Action, setVRMConfig } from './actions'
import { Action as AuthAction, setHbServiceConfig } from '../auth/actions'
import { Dispatch } from 'redux'
import { ThunkActionType } from 'utils/redux'
import { fetchAssistantConfig } from 'api/config'

interface GetVRMConfigPayload {
  usename: string
  password: string
}

export const getVRMConfig = (
  payload: GetVRMConfigPayload
): ThunkActionType => async (dispatch: Dispatch<Action | AuthAction>) => {
  try {
    const response = await fetchAssistantConfig(
      payload.usename,
      payload.password
    )
    if (response) {
      dispatch(
        setHbServiceConfig({
          host: response.hbServiceHost,
          userId: response.hbServiceUserId
        })
      )

      dispatch(
        setVRMConfig({
          vrmPath: response.vrmPath,
          camera: response.camera
        })
      )
    }
  } catch (e) {
    // TODO: show error view
  }
}
