import { BaseWindow, PowerBtnWrapper } from './common'
import { Colors } from 'theme'
import { ServiceNS } from 'models/services'
import { Switch } from 'models/accessories/Switch'
import { animated } from 'react-spring'
import { useConnectToNamespace } from 'modules/ws'
import { useEffect, useMemo, useSpring, useState } from 'hooks'
import PowerButton from 'components/PowerButton'
import React from 'react'
import SwitchIcon from 'components/icons/SwitchIcon'
import styled from 'styled-components'

interface Props {
  accessory: Switch
  style?: React.CSSProperties
}

/**
 * Accessory components for light fixtures
 */
const SwitchWindow = React.memo(({ accessory, style }: Props) => {
  const accessoryValue = accessory.value
  const [active, setActive] = useState<boolean>(false)
  const wsService = useConnectToNamespace(ServiceNS.Accessories)

  const springStyle = useSpring({
    top: active ? '0%' : '10%',
    right: active ? '0%' : '18%',
    transform: `scale(${active ? 0.45 : 1})`
  })

  const { o } = useSpring<{ o: number }>({
    o: active ? 0 : 1
  })

  useEffect(() => {
    setActive(accessoryValue)
  }, [accessoryValue])

  const icon = useMemo(
    () => (
      <>
        <IconContainer style={{ opacity: o.interpolate(o => 1 - o) }}>
          <SwitchIcon size={128} color={Colors.White} active />
        </IconContainer>
        <IconContainer style={{ opacity: o }}>
          <SwitchIcon size={128} color={Colors.White} />
        </IconContainer>
      </>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleClick = () => {
    if (wsService) {
      accessory.updateValue(!active, wsService)
    }
  }

  return (
    <BaseWindow
      uuid={accessory.uuid}
      deviceName={accessory.serviceName}
      icon={icon}
      minWidth={420}
      minHeight={230}
      style={style}
    >
      <PowerBtnWrapper style={springStyle}>
        <PowerButton size={168} active={active} onClick={handleClick} />
      </PowerBtnWrapper>
    </BaseWindow>
  )
})

const IconContainer = styled(animated.div)`
  > * {
    position: absolute;
  }
`

export default SwitchWindow
