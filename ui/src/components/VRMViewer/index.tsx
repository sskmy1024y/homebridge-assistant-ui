import React from 'react'

import { useSelector } from 'hooks'
import { useVRMPath } from 'modules/vrm'
import Controller from 'utils/Controller'
import Floor from 'components/Floor'
import VRMCanvas from 'components/VRMCanvas'
import styled from 'styled-components'

interface Props {
  floorSrc?: string
  grid?: boolean
  axes?: boolean
}

export default function VRMViewer({ floorSrc, grid, axes }: Props) {
  const vrmPath = useVRMPath()
  const camera = useSelector(state => state.vrm.camera)

  return (
    <Container>
      <VRMCanvas vrmUrl={vrmPath}>
        <Controller
          defaultCameraPosition={camera.position}
          target={camera.target}
        />
        <directionalLight position={[0, 2, 1]} />
        {floorSrc && <Floor scale={[10, 10, 1]} texture={floorSrc} />}
        {grid && <gridHelper />}
        {axes && <axesHelper />}
      </VRMCanvas>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`
