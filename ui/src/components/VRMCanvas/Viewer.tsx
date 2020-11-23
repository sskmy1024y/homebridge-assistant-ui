import React, { useMemo } from 'react'

import { Canvas, useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Model } from './Model'
import { VRM } from '@pixiv/three-vrm'
import { initMotionManager, useMotionManager } from 'modules/vrm'
import { useDispatch, useEffect } from 'hooks'

export interface ViewerProps {
  vrmUrl: string
  children?: React.ReactNode
}

export default function Viewer({ vrmUrl, children }: ViewerProps) {
  const gltf = useLoader(GLTFLoader, vrmUrl)
  const dispatch = useDispatch()
  const motionManager = useMotionManager()

  useEffect(() => {
    VRM.from(gltf)
      .then(vrm => {
        dispatch(initMotionManager({ vrm }))
      })
      .catch(console.error)
  }, [dispatch, gltf])

  const ModelView = useMemo(
    () => motionManager && <Model gltf={gltf} motionManager={motionManager} />,
    [gltf, motionManager]
  )

  if (vrmUrl === '') {
    return null
  }

  return (
    <Canvas>
      {ModelView}
      {children}
    </Canvas>
  )
}
