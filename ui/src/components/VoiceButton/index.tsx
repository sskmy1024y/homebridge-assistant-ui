import React, { useCallback } from 'react'

import { Colors, device } from 'theme'
import { useEffect, useRef, useState } from 'hooks'
import MicIcon from 'components/icons/MicIcon'
import styled, { css } from 'styled-components'

interface Props {
  size: number
  active?: boolean
  onClick: () => void
}

interface AudioData {
  analyser: AnalyserNode | null
  source: MediaStreamAudioSourceNode | null
  dataArray: Uint8Array
  isReady: boolean
}

const VoiceButton = ({ size, active, onClick: _onClick }: Props) => {
  const [outerSize, setOuterSize] = useState(size)
  const [volume, setVolume] = useState(0)
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [audioData] = useState<AudioData>({
    analyser: null,
    source: null,
    dataArray: new Uint8Array(),
    isReady: false
  })

  const requestRef = useRef<number>(0)

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestRef.current)
      audioData.source?.disconnect()
      audioData.analyser?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Activate animation on click
  useEffect(() => {
    if (active) {
      setOuterSize(size + 50)
      setTimeout(() => {
        setOuterSize(size)
      }, 200)
    } else {
      setVolume(0)
      setOuterSize(size)
    }
  }, [active, size])

  useEffect(() => {
    if (active) setOuterSize(size + volume)
  }, [active, size, volume])

  const onClick = () => {
    if (audioContext === null) setAudioContext(new AudioContext())
    _onClick()
  }

  const onFrame = useCallback(() => {
    if (active && audioData.analyser) {
      audioData.analyser.getByteFrequencyData(audioData.dataArray)
      setVolume(
        Math.floor(
          audioData.dataArray.reduce((prev, current) => prev + current, 0) /
            1000
        )
      )
    }
    // FIXME: want to replace it with an animation using react-spring
    // requestRef.current = requestAnimationFrame(onFrame)
  }, [active, audioData.analyser, audioData.dataArray])

  // Pre-processing to get voice audio
  useEffect(() => {
    if (audioContext !== null) {
      audioData.analyser = audioContext.createAnalyser()
      navigator.getUserMedia(
        { audio: true, video: false },
        s => {
          audioData.source = audioContext.createMediaStreamSource(s)
          if (audioData.analyser) {
            audioData.source.connect(audioData.analyser)
            audioData.dataArray = new Uint8Array(
              audioData.analyser.frequencyBinCount
            )
            audioData.isReady = true
            requestRef.current = requestAnimationFrame(onFrame)
          }
        },
        () => {
          // failed method
        }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioContext, audioData])

  const iconSize = 0.4 * size
  return (
    <Container size={size} onClick={onClick}>
      <OutCircle
        active={active}
        size={size}
        style={{ width: outerSize, height: outerSize }}
      />
      <InnerCircle size={size * 0.78} active={active}>
        <MicIcon size={iconSize} color={Colors.Blue00} />
      </InnerCircle>
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

const OutCircle = styled.div<StyledProps>`
  position: absolute;
  box-sizing: border-box;
  border: ${({ active }) => `${active ? 4 : 8}px solid ${Colors.Blue00}`};
  border-radius: 100%;
  z-index: 0;

  ${({ active }) =>
    !active &&
    css`
      background-color: ${Colors.White};
    `}
`

const InnerCircle = styled(Circle)`
  border: 1px solid ${Colors.Blue00};
  z-index: 1;
  ${({ active }) =>
    active &&
    css`
      background-color: ${Colors.White};
    `}

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

  transform-origin: bottom right;

  @media ${device.tablet} {
    transform: scale(0.5);
  }
`

export default VoiceButton
