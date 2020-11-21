import React from 'react'

import { number, text, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import Provider from 'stories/Provider'

import { Colors } from 'theme'
import AirIcon from 'components/icons/AirIcon'
import LightOffIcon from 'components/icons/LightIcon/Off'
import LightOnIcon from 'components/icons/LightIcon/On'
import MicIcon from 'components/icons/MicIcon'
import PowerIcon from 'components/icons/PowerIcon'
import ReactIcon from 'components/icons/ReactIcon'
import SendIcon from 'components/icons/SendIcon'
import SwitchOffIcon from 'components/icons/SwitchIcon/Off'
import SwitchOnIcon from 'components/icons/SwitchIcon/On'
import TemplatureIcon from 'components/icons/TemplatureIcon'
import styled from 'styled-components'

const storiesAll = storiesOf('Foundation|Icon', module)
storiesAll.addDecorator(withKnobs)
storiesAll.addDecorator(story => <Provider story={story} />)
storiesAll.add('Icons', () => {
  const size = number('size', 64)
  const color = text('color', Colors.Blue00)

  return (
    <List>
      <section>
        <Title>Accessories</Title>
        <IconWrapper>
          <LightOnIcon size={size} color={color} />
          <LightOffIcon size={size} color={color} />
          <TemplatureIcon size={size} color={color} />
          <AirIcon size={size} color={color} />
          <PowerIcon size={size} color={color} />
          <MicIcon size={size} color={color} />
          <SwitchOnIcon size={size} color={color} />
          <SwitchOffIcon size={size} color={color} />
          <SendIcon size={size} />
        </IconWrapper>
      </section>
    </List>
  )
})

storiesOf('Foundation|Icon', module)
  .addDecorator(withKnobs)
  .add('ReactIcon', () => {
    return <ReactIcon />
  })

const List = styled.div`
  padding: 36px 40px 40px;
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(4, min-content);
`

const Title = styled.div`
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
  margin-bottom: 12px;
  color: ${Colors.Black};
`

const IconWrapper = styled.div`
  > svg {
    border: 1px solid ${Colors.Blue50};
    margin: 5px;
    padding: 5px;
  }
`

const constantIconProps = {
  size: 64,
  color: Colors.Black
}
const storiesAccessory = storiesOf('Foundation|Icon/Accessory', module)
storiesAccessory.addDecorator(withKnobs)
storiesAccessory.addDecorator(story => <Provider story={story} />)
storiesAccessory.add('LightOnIcon', () => (
  <LightOnIcon {...constantIconProps} />
))
storiesAccessory.add('LightOffIcon', () => (
  <LightOffIcon {...constantIconProps} />
))
storiesAccessory.add('TemplatureIcon', () => (
  <TemplatureIcon {...constantIconProps} />
))
storiesAccessory.add('AirIcon', () => <AirIcon {...constantIconProps} />)
storiesAccessory.add('PowerIcon', () => <PowerIcon {...constantIconProps} />)
storiesAccessory.add('MicIcon', () => <MicIcon {...constantIconProps} />)
storiesAccessory.add('SwitchOnIcon', () => (
  <SwitchOnIcon {...constantIconProps} />
))
storiesAccessory.add('SwitchOffIcon', () => (
  <SwitchOffIcon {...constantIconProps} />
))
storiesAccessory.add('SendIcon', () => <SendIcon {...constantIconProps} />)
