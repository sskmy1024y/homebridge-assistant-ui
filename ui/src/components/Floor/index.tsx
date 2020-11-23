import * as THREE from 'three'
import { ReactThreeFiber } from 'react-three-fiber'
import { useMemo } from 'hooks'
import React from 'react'

type Props = ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh> & {
  texture?: string
}

export default function Floor({ texture: url, ...props }: Props) {
  const texture = useMemo(
    () => (url ? new THREE.TextureLoader().load(url) : null),
    [url]
  )

  return (
    <mesh {...props}>
      <planeBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' map={texture} />
    </mesh>
  )
}

Floor.defaultProps = {
  scale: [1, 1, 1],
  position: [0, 0, 0],
  rotation: [-Math.PI / 2, 0, 0]
}
