import { useSelector } from 'hooks'

export const useAuth = () => {
  return useSelector(state => state.auth)
}

export const useToken = () => {
  const { token } = useAuth()
  return token
}
