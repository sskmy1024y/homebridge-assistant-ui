import React from 'react'

import { Vector3 } from 'three'
import { importVRMConfig } from 'models/ui/VRM'
import { useEffect, useState } from 'hooks'
import Controller from 'utils/Controller'
import Floor from 'components/Floor'
import VRMCanvas from 'components/VRMCanvas'
import styled from 'styled-components'

interface Props {
  motionUrl?: string // motion settings json url
  floorSrc?: string
  grid?: boolean
  axes?: boolean
}

export default function VRMViewer({ motionUrl, floorSrc, grid, axes }: Props) {
  const [vrmUrl, setVrmUrl] = useState('')

  const [cameraPosition, setCameraPosition] = useState<Vector3>(
    new Vector3(0, 1.5, -1.2)
  )
  const [targetPosition, setTargetPosition] = useState<Vector3>(
    new Vector3(0, 1.2, 0)
  )

  const fetchConfig = async (url: string) => {
    const config = await fetch(url)
    const {
      model,
      init: { camera }
    } = importVRMConfig(await config.json())
    setVrmUrl(model)

    camera?.position && setCameraPosition(camera.position)
    camera?.target && setTargetPosition(camera.target)
  }

  useEffect(() => {
    console.log(process.env)
    if (motionUrl) {
      fetchConfig(motionUrl)
    }
  }, [motionUrl])

  return (
    <Container>
      <VRMCanvas vrmUrl={vrmUrl}>
        <Controller
          defaultCameraPosition={cameraPosition}
          target={targetPosition}
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
