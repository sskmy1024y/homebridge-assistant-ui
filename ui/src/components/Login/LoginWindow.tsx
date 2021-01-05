import { Colors } from 'theme'
import { useVRMFetchStatus } from 'modules/vrm'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import theme from 'theme/default'

interface Props {
  onSubmit({ username, password }: { username: string; password: string }): void
}

export const LoginWindow = ({ onSubmit: _onSubmit }: Props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const fetchStatus = useVRMFetchStatus()

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (username === '' || password === '') return
      _onSubmit({ username, password })
    },
    [_onSubmit, password, username]
  )

  return (
    <WindowContainer>
      <DeviceName>{'Login'}</DeviceName>
      <FormContainer onSubmit={onSubmit}>
        {fetchStatus === 'error' && (
          <ErrorMessage>{'Username or password incorrect'}</ErrorMessage>
        )}
        <Input label={'Username'} value={username} setValue={setUsername} />
        <Input
          label={'Password'}
          value={password}
          setValue={setPassword}
          type={'password'}
        />
        <StyledSubmit type={'submit'}>
          {`Login`}
          <span>
            <i></i>
          </span>
        </StyledSubmit>
      </FormContainer>
    </WindowContainer>
  )
}

interface InputProps {
  label: string
  value: string
  setValue(e: string): void
  type?: string
}

const Input = ({ label, value, setValue, type = 'text' }: InputProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    },
    [setValue]
  )

  return (
    <InputContainer>
      <StyledInput
        type={type}
        placeholder=''
        value={value}
        onChange={onChange}
      />
      <label>{label}</label>
      <span>
        <i></i>
      </span>
    </InputContainer>
  )
}

const WindowContainer = styled.div`
  position: relative;
  background: ${theme.background.window.main};
  border: 1px solid ${theme.ui.border.main};
  padding: 10px 16px;
  width: 36rem;
  touch-action: none;
`

const DeviceName = styled.div`
  font-size: 36px;
  font-weight: 200;
  color: ${Colors.White};
`

const FormContainer = styled.form`
  margin-top: 32px;
`

const InputContainer = styled.div`
  position: relative;
  width: 80%;
  margin: 24px 3%;

  input {
    font: 15px/24px sans-serif;
    box-sizing: border-box;
    width: 100%;
    letter-spacing: 1px;
    padding-left: 7em;
    z-index: 2;

    &:focus {
      outline: none;
    }
  }
`

const StyledInput = styled.input`
  padding: 7px 14px;
  transition: 0.4s;
  border: 1px solid ${Colors.Blue50};
  background-color: ${Colors.White32};

  ~ span {
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      content: '';
      transition: 0.3s;
      background-color: ${Colors.Blue00};
    }

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      content: '';
      transition: 0.3s;
      background-color: ${Colors.Blue00};
      top: auto;
      right: 0;
      bottom: 0;
      left: auto;
    }

    i {
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 0;
        content: '';
        transition: 0.4s;
        background-color: ${Colors.Blue00};
      }

      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 0;
        content: '';
        transition: 0.4s;
        background-color: ${Colors.Blue00};
        top: auto;
        right: 0;
        bottom: 0;
        left: auto;
      }
    }

    & ~ span {
      &:before,
      &:after {
        width: 100%;
        transition: 0.3s;
      }

      i {
        &:before,
        &:after {
          height: 100%;
          transition: 0.4s;
        }
      }
    }
  }

  ~ label {
    position: absolute;
    top: 12px;
    left: 14px;
    width: auto;
    transition: 0.3s;
    letter-spacing: 0.5px;
    color: #aaaaaa;
    z-index: 1;
  }

  &:focus {
    & ~ span {
      &::before,
      &::after {
        width: 100%;
        transition: 0.3s;
      }

      i {
        &::before,
        &::after {
          height: 100%;
          transition: 0.4s;
        }
      }
    }

    & ~ label {
      font-size: 12px;
      top: -18px;
      left: 0;
      transition: 0.3s;
      color: ${Colors.White};
    }
  }
`

const StyledSubmit = styled.button`
  position: relative;
  background-color: ${Colors.Blue50};
  padding: 10px 8px;
  color: ${Colors.White};
  font-weight: 500;
  transition: background-color 0.4s;
  text-align: center;
  border: 0;
  width: 100%;
  cursor: pointer;

  > span {
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      content: '';
      transition: 0.3s;
      background-color: ${Colors.White80};
    }

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 2px;
      content: '';
      transition: 0.3s;
      background-color: ${Colors.White80};
      top: auto;
      right: 0;
      bottom: 0;
      left: auto;
    }

    i {
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 0;
        content: '';
        transition: 0.4s;
        background-color: ${Colors.White80};
      }

      &:after {
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 0;
        content: '';
        transition: 0.4s;
        background-color: ${Colors.White80};
        top: auto;
        right: 0;
        bottom: 0;
        left: auto;
      }
    }
  }

  &:hover {
    background-color: ${Colors.Blue00};

    span {
      &::before,
      &::after {
        width: 100%;
        transition: 0.3s;
      }

      i {
        &::before,
        &::after {
          height: 100%;
          transition: 0.4s;
        }
      }
    }
  }
`

const ErrorMessage = styled.div`
  color: #ff4040;
  margin-left: 24px;
  font-size: 1em;
  font-weight: 500;
`
