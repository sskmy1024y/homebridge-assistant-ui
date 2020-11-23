import React from 'react'

import { Container } from 'stories'
import { MessageVO } from 'models/ui/messageVO'
import { select, withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import MessageBox from '.'
import MessageBubble, { Direction } from './MessageBubble'
import MessageInput from './MessageInput'
import Provider from 'stories/Provider'

const stories = storiesOf('UI|Interface', module)
stories.addDecorator(withKnobs)
stories.addDecorator(story => <Provider story={story} />)

stories.add('MessageInput', () => {
  return (
    <Container background={'#ddd'}>
      <MessageInput
        onSubmit={message => {
          console.log(message)
        }}
      />
    </Container>
  )
})

stories.add('MessageBubble', () => {
  const direction = select(
    'direction',
    [Direction.Left, Direction.Right],
    Direction.Left
  )

  return (
    <Container background={'#ddd'}>
      <MessageBubble message={'aaaaaaaaaaaa'} arrow={direction} />
    </Container>
  )
})

stories.add('MessageBox', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const messages: MessageVO[] = [
    {
      message: '電気つけて',
      sender: 'user',
      timestamp: Date.now() - 2000
    },
    {
      message: '完了しました',
      sender: 'assistant',
      timestamp: Date.now() - 1000
    },
    {
      message: 'お腹すいた',
      sender: 'user',
      timestamp: Date.now() - 500
    },
    {
      message: '今日の夕飯はなんじゃろな',
      sender: 'assistant',
      timestamp: Date.now()
    }
  ]

  return (
    <Container background={'#ddd'}>
      <MessageBox />
    </Container>
  )
})
