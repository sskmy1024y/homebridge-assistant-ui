import { AnimationClip, AnimationMixer, LoopRepeat } from 'three'
import { MotionTrackPreset } from 'utils/MotionManager/MotionTrackPreset'
import { PosePreset } from 'utils/MotionManager/PosePreset'
import { VRM } from '@pixiv/three-vrm'
import { play } from './utils'
import { toTracksPoseToPose } from 'utils/MotionManager/utils'

export const PresetName = 'WAIT'

export const animate = (vrm: VRM, mixer: AnimationMixer) => {
  const blinkTrack = MotionTrackPreset.blink(vrm)
  const waitingTracks = toTracksPoseToPose(vrm, PosePreset.Waiting, {
    times: [0, 2.5]
  })
  const standerdTracks = toTracksPoseToPose(vrm, PosePreset.Standerd, {
    fromPose: PosePreset.Waiting,
    times: [2.5, 5]
  })
  const keyframeTracks = []
  if (blinkTrack) keyframeTracks.push(blinkTrack)
  if (waitingTracks) keyframeTracks.push(...waitingTracks)
  if (standerdTracks) keyframeTracks.push(...standerdTracks)
  const clip = new AnimationClip(PresetName, 5, keyframeTracks)
  play(clip, mixer, LoopRepeat)
}
