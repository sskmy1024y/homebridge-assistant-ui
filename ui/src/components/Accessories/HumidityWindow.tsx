import { BaseWindow } from './common'
import { Colors } from 'theme'
import { Humidity } from 'models/accessories/Humidity'
import { animated } from 'react-spring'
import { useMemo } from 'hooks'
import HumidityIcon from 'components/icons/HumidityIcon'
import React from 'react'
import styled from 'styled-components'

interface Props {
  accessory: Humidity
  style?: React.CSSProperties
}

/**
 * Accessory components for humidity fixtures
 */
const HumidityWindow = ({ accessory, style }: Props) => {
  const icon = useMemo(
    () => (
      <IconContainer>
        <HumidityIcon size={128} color={Colors.White} />
      </IconContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const unit = useMemo(() => {
    return accessory.unit === 'percentage' ? '%' : ''
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
  font-size: 7rem;
  height: 100%;
  align-items: center;
  justify-content: flex-end;
  padding-top: 24px;
`

const Unit = styled.div`
  font-size: 5rem;
  padding-top: 24px;
`

export default HumidityWindow
