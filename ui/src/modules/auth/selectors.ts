import { useMemo } from 'react'
import { useSelector } from 'hooks'

export const useAuth = () => {
  const auth = useSelector(state => state.auth)
  return useMemo(() => auth, [auth])
}

export const useToken = () => {
  const { token } = useAuth()
  return token
}

export const useHbServiceHost = () => {
  const { host } = useAuth()
  return host
}

export const useHbServiceUserId = () => {
  const { userId } = useAuth()
  return userId
}
