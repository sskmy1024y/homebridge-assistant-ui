import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ReactThreeFiber, extend } from 'react-three-fiber'
import { Vector3 } from 'three'
import { useEffect, useFrame, useRef, useThree } from 'hooks'
import React from 'react'

extend({ OrbitControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      readonly orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >
    }
  }
}

interface Props
  extends ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls> {
  defaultCameraPosition?: Vector3
}

export default function Controller(props: Props) {
  const {
    camera,
    gl: { domElement }
  } = useThree()
  const controls = useRef<OrbitControls>()
  const { defaultCameraPosition } = props

  useFrame(() => controls.current?.update())

  useEffect(() => {
    if (defaultCameraPosition !== undefined) {
      camera.position.set(
        defaultCameraPosition.x,
        defaultCameraPosition.y,
        defaultCameraPosition.z
      )
    }
  }, [camera, defaultCameraPosition])

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      screenSpacePanning
      {...props}
    />
  )
}
