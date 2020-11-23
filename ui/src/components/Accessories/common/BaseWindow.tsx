import React, { useCallback, useState } from 'react'

import { Colors, device } from 'theme'
import styled from 'styled-components'
import theme from 'theme/default'

interface Props {
  deviceName: string
  icon: React.ReactElement
  children: React.ReactNode
  style?: React.CSSProperties
}

export default function BaseWindow({
  deviceName,
  icon,
  children,
  style
}: Props) {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const [scale, setScale] = useState(1)

  const onDrag = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    setPositionX(event.clientX)
    setPositionY(event.clientY)
  }, [])

  return (
    <WindowContainer draggable={true} onDragEnd={onDrag} style={{top: `${positionX}px`, left: `${positionY}px`, transform: `scale(${scale})`, ...style}}>
      <DeviceName>{deviceName}</DeviceName>
      <Row>
        <IconContainer>{icon}</IconContainer>
        <MainContainer>{children}</MainContainer>
      </Row>
    </WindowContainer>
  )
}

const WindowContainer = styled.div`
  position: absolute;
  width: 480px;
  height: 230px;
  background: ${theme.background.window.main};
  border: 1px solid ${theme.ui.border.main};
  padding: 10px 16px;
  transform-origin: top left;

  @media ${device.tablet} {
    transform: scale(0.5);
  }
`

const DeviceName = styled.div`
  position: absolute;
  font-size: 36px;
  font-weight: 200;
  color: ${Colors.White};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
`

const IconContainer = styled.div`
  width: 128px;
  height: 128px;
  margin: 64px 8px 16px;
`

const MainContainer = styled.div`
  position: relative;
  flex: 1;
`
