import {
  CSSProperties,
  EffectCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import interact from 'interactjs'

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useDidMount = (effect: EffectCallback) => useEffect(effect, [])

const initInteractPosition = {
  width: 100,
  height: 100,
  x: 0,
  y: 0
}
export type InitInteractPosition = typeof initInteractPosition

/**
 * HTML要素を動かせるようにする
 * 返り値で所得できるrefと、styleをそれぞれ対象となるHTML要素の
 * refとstyleに指定することで、そのHTML要素のリサイズと移動が可能になる
 * @param position HTML要素の初期座標と大きさ、指定されない場合はinitPositionで指定された値になる
 */
export function useInteractJS<T extends Interact.Target>(
  position: Partial<typeof initInteractPosition> = initInteractPosition,
  onChanged?: (position: typeof initInteractPosition) => void
) {
  const [_position, setPosition] = useState({
    ...initInteractPosition,
    ...position
  })
  const [isEnabled, setEnable] = useState(true)

  const interactRef = useRef<T>(null)
  let { x, y, width, height } = _position

  const enable = () => {
    interact(interactRef.current as HTMLElement)
      .draggable({
        inertia: false
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },
        preserveAspectRatio: false,
        inertia: false
      })
      .on('dragmove', event => {
        x += event.dx
        y += event.dy
        setPosition({
          width,
          height,
          x,
          y
        })
      })
      .on('resizemove', event => {
        width = event.rect.width
        height = event.rect.height
        x += event.deltaRect.left
        y += event.deltaRect.top
        setPosition({
          x,
          y,
          width,
          height
        })
      })
      .on('dragend', () => {
        onChanged?.({
          width,
          height,
          x,
          y
        })
      })
      .on('resizeend', () => {
        onChanged?.({
          width,
          height,
          x,
          y
        })
      })
  }

  const disable = () => {
    interact((interactRef.current as unknown) as HTMLElement).unset()
  }

  useEffect(() => {
    if (isEnabled) {
      enable()
    } else {
      disable()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEnabled])

  useEffect(() => {
    return disable
  }, [])

  return {
    ref: interactRef,
    interactStyle: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: _position.width + 'px',
      height: _position.height + 'px',
      position: 'absolute' as CSSProperties['position']
    },
    position: _position,
    isEnabled,
    enable: () => setEnable(true),
    disable: () => setEnable(false)
  }
}
