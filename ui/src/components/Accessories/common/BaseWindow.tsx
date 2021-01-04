import React, { useCallback } from 'react'

import { Colors, device } from 'theme'
import { updateLayout } from 'modules/layout/operations'
import { useDispatch, useInteractJS } from 'hooks'
import { useHbServiceUserId } from 'modules/auth'
import { useLayout } from 'modules/layout/selector'
import styled from 'styled-components'
import theme from 'theme/default'

interface Props {
  uuid: string
  children: React.ReactNode
  deviceName?: string
  icon?: React.ReactElement
  minWidth?: number
  minHeight?: number
  style?: React.CSSProperties
}

export default function BaseWindow({
  uuid,
  deviceName,
  icon,
  children,
  minWidth = 480,
  minHeight = 230,
  style
}: Props) {
  const dispatch = useDispatch()
  const userId = useHbServiceUserId()
  const initialLayout = useLayout(uuid)

  const onChanged = useCallback(
    (position: { width: number; height: number; x: number; y: number }) => {
      if (userId) {
        dispatch(updateLayout({ userId, accessoryUUID: uuid, ...position }))
      }
    },
    [dispatch, userId, uuid]
  )

  const { ref, interactStyle } = useInteractJS<HTMLDivElement>(
    initialLayout,
    onChanged
  )

  if (!initialLayout) {
    return null
  }

  return (
    <WindowContainer
      ref={ref}
      draggable
      style={{ ...interactStyle, minWidth, minHeight, ...style }}
    >
      {deviceName && <DeviceName>{deviceName}</DeviceName>}
      <Row>
        {icon && <IconContainer>{icon}</IconContainer>}
        <MainContainer>{children}</MainContainer>
      </Row>
    </WindowContainer>
  )
}

const WindowContainer = styled.div`
  position: absolute;
  background: ${theme.background.window.main};
  border: 1px solid ${theme.ui.border.main};
  padding: 10px 16px;
  transform-origin: top left;
  box-sizing: border-box;
  touch-action: none;

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
