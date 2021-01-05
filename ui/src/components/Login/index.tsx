import { Constants } from 'utils/constants'
import { LoginWindow } from './LoginWindow'
import { getVRMConfig } from 'modules/vrm/operations'
import { useDispatch, useLocalStorage } from 'hooks'
import React from 'react'
import styled from 'styled-components'

const Login = () => {
  const dispatch = useDispatch()
  const [, setUsername] = useLocalStorage(Constants.localStorage.username, '')

  const onSubmit = ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    setUsername(username)
    dispatch(getVRMConfig({ username, password }))
  }

  return (
    <Container>
      <Wrapper>
        <LoginWindow onSubmit={onSubmit} />
      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`

const Wrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: fit-content;
  height: fit-content;
`

export default Login
