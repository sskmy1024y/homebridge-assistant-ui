import { VRMPose, VRMSchema } from '@pixiv/three-vrm'

const _zerofill = () => {
  const filled: VRMPose = {}
  Object.values(VRMSchema.HumanoidBoneName).forEach(boneName => {
    filled[boneName] = {
      rotation: [0, 0, 0, 1]
    }
  })
  return filled
}

/**
 * Stand straight
 */
const standerdPose: VRMPose = {
  ..._zerofill(),
  [VRMSchema.HumanoidBoneName.LeftUpperArm]: {
    rotation: [0, 0, Math.PI / 2 - 1, 0.8]
  },
  [VRMSchema.HumanoidBoneName.LeftHand]: {
    rotation: [0, 0, 0.1, 0]
  },
  [VRMSchema.HumanoidBoneName.RightUpperArm]: {
    rotation: [0, 0, -(Math.PI / 2 - 1), 0.8]
  },
  [VRMSchema.HumanoidBoneName.RightHand]: {
    rotation: [0, 0, -0.1, 0]
  }
}

const salute: VRMPose = {
  ...standerdPose,
  [VRMSchema.HumanoidBoneName.RightLowerArm]: {
    rotation: [0.19, 0.83, -0.1, 0.52]
  },
  [VRMSchema.HumanoidBoneName.RightUpperArm]: {
    rotation: [0.36, 0.2, -0.04, 0.91]
  }
}

const waiting: VRMPose = {
  [VRMSchema.HumanoidBoneName.UpperChest]: {
    rotation: [0.03, 0, 0, 0.1]
  }
}

const think: VRMPose = {
  [VRMSchema.HumanoidBoneName.LeftHand]: {
    rotation: [0, 0.05, 0, 0.1]
  },
  [VRMSchema.HumanoidBoneName.LeftIndexDistal]: {
    rotation: [0, 0, 0.18, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftIndexIntermediate]: {
    rotation: [0, 0, 0.18, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftIndexProximal]: {
    rotation: [0, 0, 0.18, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftLittleDistal]: {
    rotation: [0, 0, 0.23, 0.97]
  },
  [VRMSchema.HumanoidBoneName.LeftLittleIntermediate]: {
    rotation: [0, 0, 0.23, 0.97]
  },
  [VRMSchema.HumanoidBoneName.LeftLittleProximal]: {
    rotation: [0, 0, 0.23, 0.97]
  },
  [VRMSchema.HumanoidBoneName.LeftLowerArm]: {
    rotation: [0.2, -0.13, 0.73, 0.63]
  },
  [VRMSchema.HumanoidBoneName.LeftMiddleDistal]: {
    rotation: [0, 0, 0.21, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftMiddleIntermediate]: {
    rotation: [0, 0, 0.21, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftMiddleProximal]: {
    rotation: [0, 0, 0.21, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftRingDistal]: {
    rotation: [0, 0, 0.22, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftRingIntermediate]: {
    rotation: [0, 0, 0.22, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftRingProximal]: {
    rotation: [0, 0, 0.22, 0.98]
  },
  [VRMSchema.HumanoidBoneName.LeftThumbDistal]: {
    rotation: [0, 0.26, 0, 0.97]
  },
  [VRMSchema.HumanoidBoneName.LeftThumbIntermediate]: {
    rotation: [0, 0.16, 0, 0.99]
  },
  [VRMSchema.HumanoidBoneName.LeftThumbProximal]: {
    rotation: [0, 0.095, 0, 0.1]
  },
  [VRMSchema.HumanoidBoneName.LeftUpperArm]: {
    rotation: [0.05, -0.29, 0.53, 0.8]
  },
  [VRMSchema.HumanoidBoneName.RightHand]: {
    rotation: [0.01, 0, 0, 0.1]
  },
  [VRMSchema.HumanoidBoneName.RightIndexDistal]: {
    rotation: [0, 0, -0.2, 0.98]
  },
  [VRMSchema.HumanoidBoneName.RightIndexIntermediate]: {
    rotation: [0, 0, -0.2, 0.98]
  },
  [VRMSchema.HumanoidBoneName.RightIndexProximal]: {
    rotation: [0, 0, -0.2, 0.98]
  },
  [VRMSchema.HumanoidBoneName.RightLittleDistal]: {
    rotation: [0, 0, -0.63, 0.78]
  },
  [VRMSchema.HumanoidBoneName.RightLittleIntermediate]: {
    rotation: [0, 0, -0.63, 0.78]
  },
  [VRMSchema.HumanoidBoneName.RightLittleProximal]: {
    rotation: [0, 0, -0.63, 0.78]
  },
  [VRMSchema.HumanoidBoneName.RightLowerArm]: {
    rotation: [0.04, 0.91, -0.07, 0.41]
  },
  [VRMSchema.HumanoidBoneName.RightMiddleDistal]: {
    rotation: [0, 0, -0.41, 0.91]
  },
  [VRMSchema.HumanoidBoneName.RightMiddleIntermediate]: {
    rotation: [0, 0, -0.41, 0.91]
  },
  [VRMSchema.HumanoidBoneName.RightMiddleProximal]: {
    rotation: [0, 0, -0.41, 0.91]
  },
  [VRMSchema.HumanoidBoneName.RightRingDistal]: {
    rotation: [0, 0, -0.5, 0.86]
  },
  [VRMSchema.HumanoidBoneName.RightRingIntermediate]: {
    rotation: [0, 0, -0.5, 0.86]
  },
  [VRMSchema.HumanoidBoneName.RightRingProximal]: {
    rotation: [0, 0, -0.5, 0.86]
  },
  [VRMSchema.HumanoidBoneName.RightThumbDistal]: {
    rotation: [0, -0.42, 0, 0.9]
  },
  [VRMSchema.HumanoidBoneName.RightThumbIntermediate]: {
    rotation: [0, -0.26, 0, 0.97]
  },
  [VRMSchema.HumanoidBoneName.RightThumbProximal]: {
    rotation: [0, -0.16, 0, 0.99]
  },
  [VRMSchema.HumanoidBoneName.RightUpperArm]: {
    rotation: [0.07, 0.36, -0.53, 0.77]
  }
}

const tilt: VRMPose = {
  [VRMSchema.HumanoidBoneName.Chest]: {
    rotation: [0, 0, 0.03, 0.1]
  },
  [VRMSchema.HumanoidBoneName.Head]: {
    rotation: [0, 0, 0.03, 0.1]
  },
  [VRMSchema.HumanoidBoneName.Spine]: {
    rotation: [0.01, 0.01, -0.0, 0.1]
  },
  upperChest: {
    rotation: [0, 0, 0.03, 0.1]
  }
}

export const PosePreset = {
  Standerd: standerdPose,
  Salute: salute,
  Waiting: waiting,
  Think: think,
  Tilt: tilt
} as const
export type PosePreset = keyof typeof PosePreset
