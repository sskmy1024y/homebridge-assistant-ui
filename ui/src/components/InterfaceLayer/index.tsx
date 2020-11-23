import { useState } from 'hooks'
import MessageBox from 'components/MessageBox'

import React from 'react'
import VoiceButton from 'components/VoiceButton'
import styled from 'styled-components'

export default function InterfaceLayer() {
  const [micActive, setMicActive] = useState(false)

  const voiceOnClick = () => {
    setMicActive(!micActive)
  }

  return (
    <>
      <VoiceContaienr>
        <VoiceButton size={162} onClick={voiceOnClick} active={micActive} />
      </VoiceContaienr>

      <MessageBox />
    </>
  )
}

const VoiceContaienr = styled.div`
  position: absolute;
  bottom: 60px;
  right: 60px;
`
