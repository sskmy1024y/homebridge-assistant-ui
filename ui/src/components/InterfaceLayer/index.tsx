import MessageBox from 'components/MessageBox'

import React from 'react'
import styled from 'styled-components'

export default function InterfaceLayer() {
  // const [micActive, setMicActive] = useState(false)

  // const voiceOnClick = () => {
  //   setMicActive(!micActive)
  // }

  return (
    <>
      {/* <VoiceContaienr>
        <VoiceButton size={162} onClick={voiceOnClick} active={micActive} />
      </VoiceContaienr> */}

      <MessageBox />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VoiceContaienr = styled.div`
  position: absolute;
  bottom: 60px;
  right: 60px;
`
