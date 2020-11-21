import {
  AnimationActionLoopStyles,
  AnimationClip,
  AnimationMixer,
  LoopOnce,
  LoopRepeat
} from 'three'

/**
 * Utility function for animation play
 *
 * @param clip animationClip
 * @param mixer animationMixer
 * @param mode default: LoopOnce
 */
export const play = (
  clip: AnimationClip,
  mixer: AnimationMixer,
  mode: AnimationActionLoopStyles = LoopOnce
) => {
  mixer.stopAllAction()
  const action = mixer.clipAction(clip)
  if (mode === LoopRepeat) {
    action.setLoop(LoopRepeat, 1 / 0)
  } else {
    action.setLoop(LoopOnce, 0)
  }
  action.clampWhenFinished = true
  action.play()
}
