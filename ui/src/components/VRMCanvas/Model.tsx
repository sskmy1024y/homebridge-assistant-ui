import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { MotionManager } from 'utils/MotionManager'
import { VRMUtils } from '@pixiv/three-vrm'
import { useFrame } from 'react-three-fiber'
import React, { useEffect } from 'react'

interface ModelProps {
  gltf: GLTF
  motionManager: MotionManager
}

export function Model({ gltf, motionManager }: ModelProps) {
  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene)
  }, [gltf])

  useEffect(() => {
    motionManager?.animate(AnimationPreset.ResultWithWait)
  }, [motionManager])

  useFrame((_, delta) => {
    motionManager?.update(delta)
  })

  if (motionManager?.scene === undefined) {
    return null
  }

  return <primitive object={motionManager.scene} dispose={null} />
}
