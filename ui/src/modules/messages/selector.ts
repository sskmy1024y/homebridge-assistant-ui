import { useMemo } from 'react'
import { useSelector } from 'hooks'

export const useMessages = () => {
  const messages = useSelector(state => state.messages.messages)
  return useMemo(() => messages, [messages])
}
