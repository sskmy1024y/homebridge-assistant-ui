import React from 'react'

import MessageIcon from 'components/icons/MessageIcon'
import styled from 'styled-components'

interface Props {
  size: number
  onClick: () => void
}

const MessageButton = ({ size, onClick }: Props) => {
  const iconSize = 0.4 * size
  return (
    <Container onClick={onClick}>
      <MessageIcon size={iconSize} />
    </Container>
  )
}

const Container = styled.div`
  cursor: pointer;

  svg {
    transition-duration: 0.3s;
  }

  &:hover svg {
    filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
    transform: translateY(-3px);
    transition-duration: 0.3s;
  }

  &:active svg {
    opacity: 0.4;
  }
`

export default MessageButton
