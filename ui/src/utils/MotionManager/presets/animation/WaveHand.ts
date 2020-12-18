import * as ResetWithWait from './ResetWithWait'
import { AnimationClip, AnimationMixer } from 'three'
import { MotionTrackPreset } from 'utils/MotionManager/MotionTrackPreset'
import { PosePreset } from 'utils/MotionManager/PosePreset'
import { VRM } from '@pixiv/three-vrm'
import { play } from './utils'
import { toTracksPoseToPose } from 'utils/MotionManager/utils'

export const PresetName = 'WaveHand'

export const animate = (vrm: VRM, mixer: AnimationMixer) => {
  const faceFunc =
    Math.random() > 0.5 ? MotionTrackPreset.fun : MotionTrackPreset.joy
  const funTrack = faceFunc(vrm)
  const waveHandLeft1Tracks = toTracksPoseToPose(
    vrm,
    PosePreset.WaveHandRight,
    {
      times: [0, 0.35]
    }
  )

  const waveHandRight1Tracks = toTracksPoseToPose(
    vrm,
    PosePreset.WaveHandLeft,
    {
      fromPose: PosePreset.WaveHandRight,
      times: [0.4, 0.75]
    }
  )

  const waveHandLeft2Tracks = toTracksPoseToPose(
    vrm,
    PosePreset.WaveHandRight,
    {
      fromPose: PosePreset.WaveHandLeft,
      times: [0.8, 1.15]
    }
  )

  const waveHandRight2Tracks = toTracksPoseToPose(
    vrm,
    PosePreset.WaveHandLeft,
    {
      fromPose: PosePreset.WaveHandRight,
      times: [1.2, 1.55]
    }
  )

  const waveHandLeft3Tracks = toTracksPoseToPose(
    vrm,
    PosePreset.WaveHandRight,
    {
      fromPose: PosePreset.WaveHandLeft,
      times: [1.6, 1.95]
    }
  )

  if (
    !funTrack ||
    !waveHandLeft1Tracks ||
    !waveHandRight1Tracks ||
    !waveHandLeft2Tracks ||
    !waveHandRight2Tracks ||
    !waveHandLeft3Tracks
  )
    return

  const clip = new AnimationClip(PresetName, 2000, [
    funTrack,
    ...waveHandLeft1Tracks,
    ...waveHandRight1Tracks,
    ...waveHandLeft2Tracks,
    ...waveHandRight2Tracks,
    ...waveHandLeft3Tracks
  ])
  play(clip, mixer)

  setTimeout(() => {
    ResetWithWait.animate(vrm, mixer)
  }, 2000)
}
