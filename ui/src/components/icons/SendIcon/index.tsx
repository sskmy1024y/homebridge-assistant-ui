import { Colors } from 'theme'
import React from 'react'

interface Props {
  size: number
  disabled?: boolean
}

const path1 = `M1.68628 79.6337L10.3455 63.4001L1.70228 47.1921L10.6847 11.2593L124.185 63.4065L9.67348 116.571L1.68628 79.6337Z`
const path2 = `M11.7696 13.5184L120.368 63.416L10.816 114.28L3.376 79.8704L11.3568 64.9072L12.16 63.4L11.3568 61.8928L3.4016 46.9808L11.7696 13.5184ZM9.6 9L0 47.4L8.5344 63.4L0 79.4L8.5344 118.866L128 63.4L9.6 9Z`
const path3 = `M120.368 63.416L120.154 63.3168L3.52662 47.2112L11.357 61.8928L12.1602 63.4L11.357 64.9072L3.37622 79.8704L3.38262 79.9024L120.243 63.4736L120.368 63.416Z`

const SendIcon = ({ size, disabled }: Props) => (
  <svg width={size} height={size} viewBox='0 0 128 128' fill='none'>
    <path d={path1} fill={disabled ? '#ccc' : Colors.White} />
    <path d={path2} fill={Colors.Blue00} />
    <path d={path3} fill={Colors.Blue50} />
  </svg>
)

export default SendIcon
