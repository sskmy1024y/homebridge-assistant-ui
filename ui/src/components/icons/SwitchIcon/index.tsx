import React from 'react'

import SwitchOffIcon from './Off'
import SwitchOnIcon from './On'

const SwitchIcon = ({
  size,
  color,
  active
}: {
  size: number
  color: string
  active?: boolean
}) =>
  active ? (
    <SwitchOnIcon size={size} color={color} />
  ) : (
    <SwitchOffIcon size={size} color={color} />
  )

export default SwitchIcon
