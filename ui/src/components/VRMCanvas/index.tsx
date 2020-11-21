import React, { Suspense, lazy } from 'react'
import { ViewerProps } from './Viewer'

const Viewer = lazy(() => import('./Viewer'));

export default function VRMCanvas({ children, ...props }: ViewerProps) {
  return (
    <Suspense fallback={null}>
      <Viewer {...props}>{children}</Viewer>
    </Suspense>
  )
}
