import { fetchAssistantConfig } from "api/config"
import {  Dispatch } from "redux"
import { ThunkActionType } from "utils/redux"
import { Action, setVRMConfig } from "./actions"

interface GetVRMConfigPayload {
  usename: string
  password: string
}

export const getVRMConfig = (payload: GetVRMConfigPayload): ThunkActionType => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await fetchAssistantConfig(payload.usename, payload.password)
    if (response) {

      dispatch(setVRMConfig({
        vrmPath: response.vrmPath,
        camera: response.camera
      }))
    }
  } catch (e) {
    // TODO: show error view
  }
}
