import { NumberKeyframeTrack } from 'three'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

export namespace MotionTrackPreset {
  export const blink = (vrm: VRM) => {
    const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
      VRMSchema.BlendShapePresetName.Blink
    )
    if (!trackName) return null

    return new NumberKeyframeTrack(trackName, [0.0, 0.5, 1.0], [0.0, 1.0, 0.0])
  }

  export const blinkOff = (vrm: VRM) => {
    const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
      VRMSchema.BlendShapePresetName.Blink
    )
    if (!trackName) return null

    return new NumberKeyframeTrack(trackName, [0], [0])
  }

  export const joy = (vrm: VRM) => {
    const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
      VRMSchema.BlendShapePresetName.Joy
    )
    if (!trackName) return null

    return new NumberKeyframeTrack(trackName, [0.0, 0.5], [0.0, 1.0])
  }

  export const angry = (vrm: VRM) => {
    const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
      VRMSchema.BlendShapePresetName.Angry
    )
    if (!trackName) return null

    return new NumberKeyframeTrack(trackName, [0.0, 0.5], [0.0, 1.0])
  }

  export const fun = (vrm: VRM) => {
    const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
      VRMSchema.BlendShapePresetName.Fun
    )
    if (!trackName) return null

    return new NumberKeyframeTrack(trackName, [0.0, 0.5], [0.0, 1.0])
  }

  export const neutral = (vrm: VRM) => {
    // Neutral requires all facial expressions to be 0
    const blendShapePresetNames = [
      VRMSchema.BlendShapePresetName.Neutral,
      VRMSchema.BlendShapePresetName.Angry,
      VRMSchema.BlendShapePresetName.Fun,
      VRMSchema.BlendShapePresetName.Joy,
      VRMSchema.BlendShapePresetName.Sorrow
    ].filter(v => v) as string[]

    return blendShapePresetNames
      .map(blendShapePresetName => {
        const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
          blendShapePresetName
        )
        if (!trackName) return null

        const currentValue = vrm.blendShapeProxy?.getValue(blendShapePresetName)
        return new NumberKeyframeTrack(trackName, [0.0, 0.5], [currentValue, 0])
      })
      .filter(v => v !== null) as NumberKeyframeTrack[]
  }

  export const sorrow = (vrm: VRM) => {
    const trackName = vrm.blendShapeProxy?.getBlendShapeTrackName(
      VRMSchema.BlendShapePresetName.Sorrow
    )
    if (!trackName) return null

    return new NumberKeyframeTrack(trackName, [0.0, 0.5], [0.0, 1.0])
  }
}
