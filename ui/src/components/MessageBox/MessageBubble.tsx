import { Colors } from 'theme'
import React from 'react'
import styled, { css } from 'styled-components'

export enum Direction {
  Left = 'Left',
  Right = 'Right'
}

interface Props {
  message: string
  arrow: Direction
}

export default function MessageBubble({ message, arrow }: Props) {
  return (
    <Container arrow={arrow}>
      <Text>{message}</Text>
    </Container>
  )
}

const Container = styled.div<{ arrow: Direction }>`
  display: inline-block;
  position: relative;
  margin-left: 15px;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -15px;
    border: 15px solid transparent;
    ${({ arrow }) =>
      arrow === Direction.Right
        ? css`
            left: 100%;
            margin-left: -2px;
            border-left: 15px solid ${Colors.White};
          `
        : css`
            left: -28px;
            border-right: 15px solid ${Colors.White};
          `}
    z-index: 2;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    margin-top: -15px;
    border: 15px solid transparent;
    ${({ arrow }) =>
      arrow === Direction.Right
        ? css`
            left: 100%;
            border-left: 15px solid ${Colors.Blue00};
          `
        : css`
            left: -30px;
            border-right: 15px solid ${Colors.Blue00};
          `}
    z-index: 1;
  }
`

const Text = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  max-width: 100vw;
  padding: 0 26px;
  height: 60px;
  border: 1px solid ${Colors.Blue00};
  border-radius: 16px;
  background-color: ${Colors.White};
  font-size: 20px;
`
