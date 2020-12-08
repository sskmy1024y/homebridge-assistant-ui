import { ViewerProps } from './Viewer'
import React, { Suspense, lazy } from 'react'

const Viewer = lazy(() => import('./Viewer'))

export default function VRMCanvas({ children, ...props }: ViewerProps) {
  return (
    <Suspense fallback={null}>
      <Viewer {...props}>{children}</Viewer>
    </Suspense>
  )
}
