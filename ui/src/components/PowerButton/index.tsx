import React from 'react'

import { Colors } from 'theme'
import PowerIcon from 'components/icons/PowerIcon'
import styled from 'styled-components'

interface Props {
  size: number
  active?: boolean
  onClick: () => void
}

const PowerButton = ({ size, active, onClick }: Props) => {
  const iconSize = 0.4 * size
  return (
    <Container size={size} onClick={onClick}>
      <OutCircle size={size} active={active}>
        <InnerCircle size={size * 0.78} active={active}>
          <PowerIcon
            size={iconSize}
            color={active ? Colors.White : Colors.White50}
          />
        </InnerCircle>
      </OutCircle>
    </Container>
  )
}

type StyledProps = Omit<Props, 'onClick'>

const Circle = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  border-radius: ${props => `${props.size}px`};
`

const OutCircle = styled(Circle)`
  border: ${({ active }) =>
    `${active ? 8 : 4}px solid ${active ? Colors.White : Colors.White50}`};
  box-sizing: border-box;
`

const InnerCircle = styled(Circle)`
  border: ${({ active }) =>
    `1px solid ${active ? Colors.White : Colors.White50}`};

  > svg {
    margin-bottom: ${({ size }) => `${size * 0.03}px`};
    transition: fill 0.5s;
  }

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: ${props => `${props.size}px`};
    height: ${props => `${props.size}px`};
    border-radius: ${props => `${props.size}px`};
    background-color: ${Colors.White50};
    transform: scale(0);
    transition: transform 0.15s 0.1s;
  }
`

const Container = styled(Circle)`
  /* Hover trigger */
  &:hover {
    ${InnerCircle} {
      &:after {
        transform: scale(1);
        transition: transform 0.3s;
      }
    }
  }
`

export default PowerButton
