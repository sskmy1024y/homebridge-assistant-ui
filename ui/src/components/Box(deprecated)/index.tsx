import * as THREE from 'three'
import { ReactThreeFiber } from 'react-three-fiber'
import { useMemo } from 'hooks'
import React from 'react'

type Props = ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh> & {
  texture?: string
  color?: string
}

export default function Box({ texture: url, color, ...props }: Props) {
  const texture = useMemo(
    () => (url ? new THREE.TextureLoader().load(url) : null),
    [url]
  )

  return (
    <mesh {...props}>
      <boxBufferGeometry attach='geometry' />
      <meshStandardMaterial attach='material' map={texture} color={color} />
    </mesh>
  )
}

Box.defaultProps = {
  scale: [1, 1, 1],
  position: [0, 0, 0]
}
