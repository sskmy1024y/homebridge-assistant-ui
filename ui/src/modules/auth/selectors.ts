import { useSelector } from 'hooks'
import { useMemo } from 'react'

export const useAuth = () => {
  const auth = useSelector(state => state.auth)
  return useMemo(() => auth, [auth])
}

export const useToken = () => {
  const { token } = useAuth()
  return token
}

export const useHbServiceHost = () => {
  const {host} = useAuth()
  return host
}
