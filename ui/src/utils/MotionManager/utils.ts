import { PosePreset } from './PosePreset'
import { QuaternionKeyframeTrack, VectorKeyframeTrack } from 'three'
import { VRM, VRMPose, VRMSchema } from '@pixiv/three-vrm'

interface PoseToPoseOptions {
  fromPose?: VRMPose
  duration?: number
  times?: number[]
}

export const toTracksPoseToPose = (
  vrm: VRM,
  toPose: VRMPose,
  options?: PoseToPoseOptions
) => {
  const { humanoid } = vrm
  if (!humanoid) return null

  const keyframeTracks: THREE.KeyframeTrack[] = []
  const currentPose = options?.fromPose ?? humanoid.getPose()

  const times = options?.times ?? [0, options?.duration ?? 1]

  Object.keys(toPose).forEach(boneName => {
    const transform = toPose[boneName]
    if (!transform) return

    if (transform.rotation) {
      const currentPoseValues = currentPose[boneName]?.rotation ??
        PosePreset.Standerd[boneName]?.rotation ?? [0, 0, 0, 1]

      const boneNodes = humanoid.getBoneNodes(
        boneName as VRMSchema.HumanoidBoneName
      )
      boneNodes?.forEach(boneNode => {
        const keyframeTrack = new QuaternionKeyframeTrack(
          boneNode.name + '.quaternion',
          times,
          [...currentPoseValues, ...transform.rotation]
        )
        keyframeTracks.push(keyframeTrack)
      })
    }
    if (transform.position) {
      const currentPoseValues = currentPose[boneName]?.position ??
        PosePreset.Standerd[boneName]?.position ?? [0, 0, 0]

      const boneNodes = humanoid.getBoneNodes(
        boneName as VRMSchema.HumanoidBoneName
      )

      // const isCenter = trackName === VRMSchema.HumanoidBoneName.Hips
      const newValues = currentPoseValues.map((value, index) => {
        // isCenter && (value *= legsLength)
        const transform = humanoid.restPose[boneName]
        return value + (transform?.position ? transform.position[index % 3] : 0)
      })
      boneNodes.forEach(boneNode => {
        const keyframeTrack = new VectorKeyframeTrack(
          boneNode.name + '.position',
          times,
          [...currentPoseValues, ...newValues]
        )
        keyframeTracks.push(keyframeTrack)
      })
    }
  })

  return keyframeTracks
}
