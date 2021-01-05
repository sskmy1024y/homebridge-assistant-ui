import { Action, setFetchStatus, setVRMConfig } from './actions'
import {
  Action as AuthAction,
  setAuthToken,
  setHbServiceConfig
} from '../auth/actions'
import { Dispatch } from 'redux'
import { ThunkActionType } from 'utils/redux'
import { fetchAssistantConfig, fetchAssistantConfigFromToken } from 'api/config'

interface GetVRMConfigPayload {
  username: string
  password: string
}

export const getVRMConfig = (
  payload: GetVRMConfigPayload
): ThunkActionType => async (dispatch: Dispatch<Action | AuthAction>) => {
  try {
    const response = await fetchAssistantConfig(
      payload.username,
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
        setAuthToken({
          token: response.hbServiceToken,
          expire: 0
        })
      )

      dispatch(
        setVRMConfig({
          vrmPath: response.vrmPath,
          camera: response.camera
        })
      )

      dispatch(setFetchStatus({ status: 'ok' }))
    } else {
      dispatch(setFetchStatus({ status: 'error' }))
    }
  } catch (e) {
    dispatch(setFetchStatus({ status: 'error' }))
  }
}

export const getVRMConfigFromToken = ({
  username,
  accessToken
}: {
  username: string
  accessToken: string
}): ThunkActionType => async (dispatch: Dispatch<Action | AuthAction>) => {
  try {
    const response = await fetchAssistantConfigFromToken(username, accessToken)
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
      dispatch(setFetchStatus({ status: 'ok' }))
    } else {
      dispatch(setFetchStatus({ status: 'error' }))
    }
  } catch (e) {
    dispatch(setFetchStatus({ status: 'error' }))
  }
}
