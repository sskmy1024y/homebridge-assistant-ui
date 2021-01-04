import { BaseWindow } from './common'
import { Colors } from 'theme'
import { Constants } from 'utils/constants'
import { format2Digit } from 'utils/datetime'
import { useDidMount, useState } from 'hooks'
import React from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  style?: React.CSSProperties
}

const ClockWindow = ({ style }: Props) => {
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  useDidMount(() => {
    const timer = setInterval(() => {
      const date = new Date()
      setMinutes(date.getMinutes())
      setHours(date.getHours())
    }, 1000)

    return () => clearInterval(timer)
  })

  return (
    <BaseWindow
      uuid={Constants.uuid.clock}
      minWidth={276}
      minHeight={100}
      style={style}
    >
      <ClockLabel>
        {format2Digit(hours)}
        <span>{`:`}</span>
        {format2Digit(minutes)}
      </ClockLabel>
    </BaseWindow>
  )
}

const blankAnim = keyframes`
   0% { opacity: 1 }
   50% { opacity: 0 }
   100% { opacity: 1 }
`

const ClockLabel = styled.div`
  font-size: 5rem;
  text-align: center;
  color: ${Colors.White};

  > span {
    animation: ${blankAnim} 2s ease-in infinite;
  }
`

export default ClockWindow
