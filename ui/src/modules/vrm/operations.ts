import { fetchAssistantConfig } from "api/config"
import { setHbServiceHost } from "modules/auth"
import {  Dispatch } from "redux"
import { ThunkActionType } from "utils/redux"
import { Action, setVRMConfig } from "./actions"
import { Action as AuthAction } from '../auth/actions'

interface GetVRMConfigPayload {
  usename: string
  password: string
}

export const getVRMConfig = (payload: GetVRMConfigPayload): ThunkActionType => async (dispatch: Dispatch<Action | AuthAction>) => {
  try {
    const response = await fetchAssistantConfig(payload.usename, payload.password)
    if (response) {
      dispatch(setHbServiceHost({
        host: response.hbServiceHost
      }))

      dispatch(setVRMConfig({
        vrmPath: response.vrmPath,
        camera: response.camera
      }))
    }
  } catch (e) {
    // TODO: show error view
  }
}
