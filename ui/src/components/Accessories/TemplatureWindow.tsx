import { BaseWindow } from './common'
import { Colors } from 'theme'
import { Templature } from 'models/accessories/Templature'
import { animated } from 'react-spring'
import { useMemo } from 'hooks'
import React from 'react'
import TemplatureIcon from 'components/icons/TemplatureIcon'
import styled from 'styled-components'

interface Props {
  accessory: Templature
  style?: React.CSSProperties
}

/**
 * Accessory components for templature fixtures
 */
const TemplatureWindow = ({ accessory, style }: Props) => {
  const icon = useMemo(
    () => (
      <IconContainer>
        <TemplatureIcon size={128} color={Colors.White} />
      </IconContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const unit = useMemo(() => {
    return accessory.unit === 'celsius' ? '℃' : '℉'
  }, [accessory.unit])

  return (
    <BaseWindow
      uuid={accessory.uuid}
      deviceName={accessory.serviceName}
      icon={icon}
      minWidth={420}
      minHeight={230}
      style={style}
    >
      <UnitContainer>
        <div>{accessory.value}</div>
        <Unit>{unit}</Unit>
      </UnitContainer>
    </BaseWindow>
  )
}

const IconContainer = styled(animated.div)`
  > * {
    position: absolute;
  }
`

const UnitContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: ${Colors.White};
  font-size: 5rem;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  padding-top: 24px;
`

const Unit = styled.div`
  font-size: 4rem;
  padding-top: 14px;
`

export default TemplatureWindow
