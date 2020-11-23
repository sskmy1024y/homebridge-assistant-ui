import { Colors } from 'theme'
import { useDidMount } from 'hooks'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import SendIcon from 'components/icons/SendIcon'
import styled, { css } from 'styled-components'

interface Props {
  onSubmit(text: string): void
}

export default function MessageInput({ onSubmit }: Props) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const disabled = useMemo(() => value === '', [value])

  useDidMount(() => {
    inputRef.current?.focus()
  })

  const onClick = useCallback(() => {
    onSubmit(value)
    setValue('')
  }, [onSubmit, value])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (
        value !== '' &&
        event.key === 'Enter' &&
        (event.ctrlKey || event.metaKey)
      ) {
        event.preventDefault()
        onClick()
      }
    },
    [onClick, value]
  )

  return (
    <Container>
      <TextArea
        ref={inputRef}
        value={value}
        onKeyDown={onKeyDown}
        onChange={e => setValue(e.target.value)}
      />

      <ButtonContainer disabled={disabled} onClick={onClick}>
        <SendIcon size={64} disabled={disabled} />
      </ButtonContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  padding: 0 26px;
  min-width: 600px;
  height: 100px;
  border: 1px solid ${Colors.Blue00};
  border-radius: 16px;
  background-color: ${Colors.White};
`

const TextArea = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  resize: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-right: 16px;
  font-size: 20px;
`

const ButtonContainer = styled.div<{ disabled: boolean }>`
  cursor: pointer;

  svg {
    transition-duration: 0.3s;
  }

  ${props =>
    !props.disabled &&
    css`
      &:hover svg {
        filter: drop-shadow(5px 5px 3px rgba(0, 0, 0, 0.5));
        transform: translateY(-3px);
        transition-duration: 0.3s;
      }

      &:active svg {
        opacity: 0.4;
      }
    `}
`
