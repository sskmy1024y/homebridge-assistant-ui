import * as ResetWithWait from './ResetWithWait'
import { AnimationClip, AnimationMixer, LoopRepeat } from 'three'
import { MotionTrackPreset } from 'utils/MotionManager/MotionTrackPreset'
import { PosePreset } from 'utils/MotionManager/PosePreset'
import { VRM } from '@pixiv/three-vrm'
import { play } from './utils'
import { toTracksPoseToPose } from 'utils/MotionManager/utils'

export const PresetName = 'THINK'

export const animate = (vrm: VRM, mixer: AnimationMixer) => {
  const saluteTracks = toTracksPoseToPose(vrm, PosePreset.Think, {
    duration: 0.5
  })
  const blinkOff = MotionTrackPreset.blinkOff(vrm)
  const sorrowTrack = MotionTrackPreset.sorrow(vrm)
  if (!saluteTracks || !sorrowTrack || !blinkOff) return

  const clip = new AnimationClip(PresetName, 0.5, [
    ...saluteTracks,
    sorrowTrack,
    blinkOff
  ])
  play(clip, mixer)

  setTimeout(() => {
    const blinkTrack = MotionTrackPreset.blink(vrm)
    const tiltTracks = toTracksPoseToPose(vrm, PosePreset.Tilt, {
      times: [0, 2]
    })
    const keyframeTracks = []
    if (blinkTrack) keyframeTracks.push(blinkTrack)
    if (tiltTracks) keyframeTracks.push(...tiltTracks)
    const clip = new AnimationClip(`${PresetName}_WAIT`, 5, keyframeTracks)
    play(clip, mixer, LoopRepeat)

    setTimeout(() => {
      ResetWithWait.animate(vrm, mixer)
    }, 3500)
  }, 1000)
}
