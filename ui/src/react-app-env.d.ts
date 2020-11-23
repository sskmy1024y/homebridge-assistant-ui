/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="node" />
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="react" />
/// <reference types="react-dom" />

// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  // eslint-disable-next-line no-unused-vars
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string
    }
  >

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.vmd' {
  const src: string
  export default src
}

declare module '*.vrm' {
  const src: string
  export default src
}

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}
