import React from 'react'

import { BaseWindow, PowerBtnWrapper } from './common'
import { Colors } from 'theme'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { useEffect, useMemo, useSpring, useState } from 'hooks'
import LightIcon from 'components/icons/LightIcon'
import LightWindow from './LightWindow'
import PowerButton from 'components/PowerButton'
import Provider from 'stories/Provider'
import TemplatureIcon from 'components/icons/TemplatureIcon'

enum IconSet {
  LightOn = 'LightOn',
  LightOff = 'LightOff',
  Templature = 'Templature'
}

const stories = storiesOf('UI|Accessories', module)
stories.addDecorator(withKnobs)
stories.addDecorator(story => <Provider story={story} />)

stories.add('BaseWindow', () => {
  const deviceName = text('deviceName', 'Light')
  const isActive = boolean('active', true)
  const iconType = select(
    'icon',
    [IconSet.LightOn, IconSet.LightOff, IconSet.Templature],
    IconSet.LightOn
  )
  const [active, setActive] = useState(isActive)

  useEffect(() => {
    setActive(isActive)
  }, [isActive])

  const icon = useMemo(() => {
    switch (iconType) {
      case IconSet.LightOn:
        return <LightIcon size={128} color={Colors.White} active />
      case IconSet.LightOff:
        return <LightIcon size={128} color={Colors.White} />
      case IconSet.Templature:
        return <TemplatureIcon size={128} color={Colors.White} />
      default:
        return <React.Fragment />
    }
  }, [iconType])

  const props = useSpring({
    top: active ? '0%' : '10%',
    right: active ? '0%' : '18%',
    transform: `scale(${active ? 0.45 : 1})`
  })

  return (
    <BaseWindow uuid={''} deviceName={deviceName} icon={icon}>
      <PowerBtnWrapper style={props}>
        <PowerButton
          size={168}
          active={active}
          onClick={() => setActive(!active)}
        />
      </PowerBtnWrapper>
    </BaseWindow>
  )
})

stories.add('LightWindow', () => {
  return <LightWindow />
})

stories.add('SwitchWindow', () => {
  // return <SwitchWindow accessory={} />
  return <div />
})
