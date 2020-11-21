import { useMemo } from 'react'
import { useSelector } from 'hooks'

export const useAssistant = () => {
  const assistant = useSelector(state => state.vrm.assistant)
  return useMemo(() => assistant, [assistant])
}

export const useMotionManager = () => {
  const assistant = useAssistant()
  return useMemo(() => assistant?.motionManager ?? null, [assistant])
}
