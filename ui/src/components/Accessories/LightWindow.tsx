import { BaseWindow, PowerBtnWrapper } from './common'
import { Colors } from 'theme'
import { animated } from 'react-spring'
import { useMemo, useSpring, useState } from 'hooks'
import LightIcon from 'components/icons/LightIcon'
import PowerButton from 'components/PowerButton'
import React from 'react'
import styled from 'styled-components'

interface Props {
  style?: React.CSSProperties
}

/**
 * Accessory components for light fixtures
 */
const LightWindow = ({ style }: Props) => {
  const [active, setActive] = useState(false)

  const springStyle = useSpring({
    top: active ? '0%' : '10%',
    right: active ? '0%' : '18%',
    transform: `scale(${active ? 0.45 : 1})`
  })

  const { o } = useSpring({
    o: active ? 0 : 1
  })

  const icon = useMemo(
    () => (
      <>
        <IconContainer style={{ opacity: o.interpolate(o => 1 - o) }}>
          <LightIcon size={128} color={Colors.White} active />
        </IconContainer>
        <IconContainer style={{ opacity: o }}>
          <LightIcon size={128} color={Colors.White} />
        </IconContainer>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <BaseWindow deviceName={'light'} icon={icon} style={style}>
      <PowerBtnWrapper style={springStyle}>
        <PowerButton
          size={168}
          active={active}
          onClick={() => setActive(!active)}
        />
      </PowerBtnWrapper>
    </BaseWindow>
  )
}

const IconContainer = styled(animated.div)`
  > * {
    position: absolute;
  }
`

export default LightWindow
