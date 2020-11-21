import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { device } from 'theme'
import { sendMessage } from 'modules/messages'
import { useAccessories } from 'modules/service/selector'
import { useDispatch } from 'hooks'
import { useMessages } from 'modules/messages/selector'
import MessageBubble, { Direction } from './MessageBubble'
import MessageButton from 'components/MessageButton'
import MessageInput from './MessageInput'
import styled from 'styled-components'

export default function MessageBox() {
  const [visible, setVisible] = useState(false)
  const messages = useMessages()

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (visible) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current?.scrollHeight ?? 0
      })
    }
  }, [visible, messages])

  const sortedMessage = useMemo(() => {
    return messages.slice().sort((a, b) => a.timestamp - b.timestamp)
  }, [messages])

  const onSubmit = useCallback(
    (message: string) => {
      dispatch(sendMessage({ message }))
    },
    [dispatch]
  )

  const onShow = () => setVisible(true)

  const onHide = () => setVisible(false)

  return (
    <>
      {visible && <Overlay onClick={onHide} />}
      <Container>
        {visible ? (
          <Box ref={scrollRef}>
            {sortedMessage.map((m, i) => (
              <MessageBubble
                key={i}
                message={m.message}
                arrow={m.sender === 'user' ? Direction.Left : Direction.Right}
              />
            ))}
            <MessageInput onSubmit={onSubmit} />
          </Box>
        ) : (
          <MessageButton size={300} onClick={onShow} />
        )}
      </Container>
    </>
  )
}

const Container = styled.div`
  position: absolute;
  bottom: 60px;
  left: 60px;
  transform-origin: bottom left;
  max-width: 100vw;

  @media ${device.tablet} {
    transform: scale(0.5);
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-height: 360px;
  padding: 10px 20px;
  overflow-y: scroll;
  z-index: 2;

  > * + * {
    margin-top: 18px;
  }
`

const Overlay = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`
