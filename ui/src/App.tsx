import Accessories from 'components/Accessories'

import { DebugTool } from 'components/DebugTools'
import InterfaceLayer from 'components/InterfaceLayer'
import React from 'react'
import VRMViewer from 'components/VRMViewer'
import reset from 'styled-reset'
import styled, { createGlobalStyle } from 'styled-components'

const motionSetting = './assets/motions/setting.json'

function App() {
  return (
    <>
      <GlobalStyle />
      <VRMViewer
        motionUrl={motionSetting}
        floorSrc={'./assets/textures/floor-texture.jpg'}
      />
      <UIViewer>
        <Accessories />
        <InterfaceLayer />
        <DebugTool />
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
