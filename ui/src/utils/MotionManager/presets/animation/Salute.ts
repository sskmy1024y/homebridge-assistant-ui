import * as ResetWithWait from './ResetWithWait'
import { AnimationClip, AnimationMixer } from 'three'
import { MotionTrackPreset } from 'utils/MotionManager/MotionTrackPreset'
import { PosePreset } from 'utils/MotionManager/PosePreset'
import { VRM } from '@pixiv/three-vrm'
import { play } from './utils'
import { toTracksPoseToPose } from 'utils/MotionManager/utils'

export const PresetName = 'SALUTE'

export const animate = (vrm: VRM, mixer: AnimationMixer) => {
  const saluteTracks = toTracksPoseToPose(vrm, PosePreset.Salute, {
    duration: 0.5
  })
  const blinkOff = MotionTrackPreset.blinkOff(vrm)
  const funTrack = MotionTrackPreset.fun(vrm)
  if (!saluteTracks || !funTrack || !blinkOff) return

  const clip = new AnimationClip(PresetName, 0.5, [
    ...saluteTracks,
    funTrack,
    blinkOff
  ])
  play(clip, mixer)

  setTimeout(() => {
    ResetWithWait.animate(vrm, mixer)
  }, 1500)
}
