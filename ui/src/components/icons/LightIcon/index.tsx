import React from 'react'

import LightOffIcon from './Off'
import LightOnIcon from './On'

const LightIcon = ({
  size,
  color,
  active
}: {
  size: number
  color: string
  active?: boolean
}) =>
  active ? (
    <LightOnIcon size={size} color={color} />
  ) : (
    <LightOffIcon size={size} color={color} />
  )

export default LightIcon
