import React from 'react'

import { Container } from 'stories'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import MessageButton from '.'
import Provider from 'stories/Provider'

const stories = storiesOf('UI|Accessories', module)
stories.addDecorator(withKnobs)
stories.addDecorator(story => <Provider story={story} />)

stories.add('MessageButton', () => {
  return (
    <Container background={'#ddd'}>
      {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
      <MessageButton size={164} onClick={() => {}} />
    </Container>
  )
})
