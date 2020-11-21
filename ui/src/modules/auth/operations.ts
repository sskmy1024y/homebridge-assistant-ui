import { Action, setAuthToken } from '.'
import { Dispatch } from 'redux'
import { ThunkActionType } from 'utils/redux'
import { fetchAuthToken } from 'api/auth'

interface GetAuthTokenPayload {
  usename: string
  password: string
}

export const getAuthToken = (
  payload: GetAuthTokenPayload
): ThunkActionType => async (dispatch: Dispatch<Action>) => {
  try {
    const authResponse = await fetchAuthToken(payload.usename, payload.password)
    if (authResponse) {
      dispatch(
        setAuthToken({
          token: authResponse.access_token,
          expire: authResponse.expires_in
        })
      )
    }
  } catch (e) {
    // TODO: show error view
  }
}
