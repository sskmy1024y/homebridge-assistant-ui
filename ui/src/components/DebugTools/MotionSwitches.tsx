import { AnimationPreset } from 'utils/MotionManager/presets/animation'
import { MotionManager } from 'utils/MotionManager'
import { PosePreset } from 'utils/MotionManager/PosePreset'
import { VRMPose } from '@pixiv/three-vrm'
import { useMotionManager } from 'modules/vrm'
import React, { useCallback } from 'react'

export function MotionSwitches() {
  const manager = useMotionManager()
  const presets = Object.values(AnimationPreset)

  const poses = [
    PosePreset.Salute,
    PosePreset.Standerd,
    PosePreset.Waiting,
    PosePreset.Think
  ]

  if (manager === null) {
    return null
  }

  return (
    <>
      <p>{'Animations'}</p>
      {presets.map((preset, i) => (
        <MotionButton key={i} preset={preset} motionManager={manager} />
      ))}
      <p>{'Motions'}</p>
      {poses.map((pose, i) => (
        <PoseButton key={i} preset={pose} motionManager={manager} />
      ))}
    </>
  )
}

interface MotionButtonProps {
  motionManager: MotionManager
  preset: AnimationPreset
}

export function MotionButton({ motionManager, preset }: MotionButtonProps) {
  const onClick = useCallback(() => {
    motionManager.animate(preset)
  }, [motionManager, preset])
  return <button onClick={onClick}>{preset}</button>
}

interface PoseButtonProps {
  motionManager: MotionManager
  preset: VRMPose
}

export function PoseButton({ motionManager, preset }: PoseButtonProps) {
  const onClick = useCallback(() => {
    motionManager.vrm.humanoid?.setPose(preset)
  }, [motionManager, preset])
  return <button onClick={onClick}>{'pose'}</button>
}
