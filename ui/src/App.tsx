import Accessories from 'components/Accessories'

// import { DebugTool } from 'components/DebugTools'
import { Constants } from 'utils/constants'
import { setAuthToken, useToken } from 'modules/auth'
import { useDidMount, useDispatch, useLocalStorage } from 'hooks'
import InterfaceLayer from 'components/InterfaceLayer'
import Login from 'components/Login'
import React from 'react'
import VRMViewer from 'components/VRMViewer'
import reset from 'styled-reset'
import styled, { createGlobalStyle } from 'styled-components'

function App() {
  const dispatch = useDispatch()
  const [accessToken] = useLocalStorage(Constants.localStorage.accessToken, '')
  const token = useToken()

  // The startup process is performed here.
  // If the process becomes fat, move it.
  useDidMount(() => {
    if (accessToken !== '') {
      dispatch(
        setAuthToken({
          token: accessToken,
          expire: 0
        })
      )
    }
  })

  return (
    <>
      <GlobalStyle />
      <VRMViewer floorSrc={'./assets/textures/floor-texture.jpg'} />
      <UIViewer>
        {token !== null ? (
          <>
            <Accessories />
            <InterfaceLayer />
            {/* <DebugTool /> */}
          </>
        ) : (
          <Login />
        )}
      </UIViewer>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  ${reset}

  html, body{
    overflow: hidden;
  }
`

const UIViewer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export default App
