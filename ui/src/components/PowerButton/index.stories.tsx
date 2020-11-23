import React from 'react'

import { Container } from 'stories'
import { boolean, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import { useState } from 'hooks'
import PowerButton from '.'
import Provider from 'stories/Provider'

const stories = storiesOf('UI|Accessories', module)
stories.addDecorator(withKnobs)
stories.addDecorator(story => <Provider story={story} />)

stories.add('PowerButton', () => {
  const isActive = boolean('active', true)

  const [active, setActive] = useState(isActive)

  return (
    <Container background={'#ddd'}>
      <PowerButton
        size={164}
        active={active}
        onClick={() => setActive(!active)}
      />
    </Container>
  )
})
