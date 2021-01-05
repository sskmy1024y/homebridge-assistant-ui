import React from 'react'

import { Container } from 'stories'
import { LoginWindow } from './LoginWindow'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import Provider from 'stories/Provider'

const stories = storiesOf('UI|Interface', module)
stories.addDecorator(withKnobs)
stories.addDecorator(story => <Provider story={story} />)

stories.add('LoginWindow', () => {
  const onSubmit = ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    console.log(username, password)
  }

  return (
    <Container background={'#ddd'}>
      <LoginWindow onSubmit={onSubmit} />
    </Container>
  )
})
