import { AnimationMixer } from 'three'
import { AnimationPreset, getAnimate } from './presets/animation'
import { PosePreset } from './PosePreset'
import { VRM } from '@pixiv/three-vrm'

export class MotionManager {
  private _vrm: VRM
  private _mixer: AnimationMixer

  constructor(vrm: VRM) {
    this._vrm = vrm
    this._mixer = new AnimationMixer(vrm.scene)
    this._vrm.humanoid?.setPose(PosePreset.Standerd)
  }

  get vrm() {
    return this._vrm
  }

  get scene() {
    return this._vrm.scene
  }

  update(delta: number) {
    this._mixer.update(delta)
    this._vrm.update(delta)
  }

  async animate(preset: AnimationPreset) {
    const animation = getAnimate(preset)
    return animation(this._vrm, this._mixer)
  }
}
