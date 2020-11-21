import * as Reset from './Reset'
import * as Wait from './Wait'
import { AnimationMixer } from 'three'
import { VRM } from '@pixiv/three-vrm'

export const PresetName = 'RESET_WITH_WAIT'

export const animate = (vrm: VRM, mixer: AnimationMixer) => {
  Reset.animate(vrm, mixer)

  setTimeout(() => {
    Wait.animate(vrm, mixer)
  }, 1000)
}
