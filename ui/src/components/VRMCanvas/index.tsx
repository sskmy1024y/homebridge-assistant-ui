import React, { Suspense } from 'react'
import Viewer, { ViewerProps } from './Viewer'

export default function VRMCanvas({ children, ...props }: ViewerProps) {
  return (
    <Suspense fallback={null}>
      <Viewer {...props}>{children}</Viewer>
    </Suspense>
  )
}
