import { AnimationClip, AnimationMixer } from 'three'
import { MotionTrackPreset } from 'utils/MotionManager/MotionTrackPreset'
import { PosePreset } from 'utils/MotionManager/PosePreset'
import { VRM } from '@pixiv/three-vrm'
import { play } from './utils'
import { toTracksPoseToPose } from 'utils/MotionManager/utils'

export const PresetName = 'RESET'

export const animate = (vrm: VRM, mixer: AnimationMixer) => {
  const toStanderdTracks = toTracksPoseToPose(vrm, PosePreset.Standerd)
  const neutralTracks = MotionTrackPreset.neutral(vrm)

  const keyframeTracks = []
  if (toStanderdTracks) keyframeTracks.push(...toStanderdTracks)
  if (neutralTracks) keyframeTracks.push(...neutralTracks)
  const clip = new AnimationClip(PresetName, 5, keyframeTracks)
  play(clip, mixer)
}
