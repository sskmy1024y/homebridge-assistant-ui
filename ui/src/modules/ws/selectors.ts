import { useMemo } from 'react'
import { useSelector } from 'hooks'

export const useWs = () => {
  const ws = useSelector(state => state.ws)
  return useMemo(() => ws, [ws])
}
