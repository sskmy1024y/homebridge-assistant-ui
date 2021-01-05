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

export const useVRMPath = () => {
  const vrmPath = useSelector(state => state.vrm.vrmPath)
  return useMemo(() => vrmPath ?? '', [vrmPath])
}

export const useVRMFetchStatus = () => {
  const status = useSelector(state => state.vrm.fetchStatus)
  return useMemo(() => status, [status])
}
