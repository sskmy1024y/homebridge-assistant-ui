import * as Reset from './Reset'
import * as ResultWithWait from './ResetWithWait'
import * as Salute from './Salute'
import * as Think from './Think'
import * as Wait from './Wait'

export const AnimationPreset = {
  Reset: Reset.PresetName,
  Wait: Wait.PresetName,
  ResultWithWait: ResultWithWait.PresetName,
  Salute: Salute.PresetName,
  Think: Think.PresetName
} as const
export type AnimationPreset = typeof AnimationPreset[keyof typeof AnimationPreset]

const animates = {
  [Reset.PresetName]: Reset.animate,
  [Wait.PresetName]: Wait.animate,
  [ResultWithWait.PresetName]: ResultWithWait.animate,
  [Salute.PresetName]: Salute.animate,
  [Think.PresetName]: Think.animate
} as const

export const getAnimate = (preset: AnimationPreset) => {
  return animates[preset]
}
