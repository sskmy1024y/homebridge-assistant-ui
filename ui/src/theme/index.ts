export * from './default'
export { default as Colors } from './colors'
export * from './mediaQuery'

export type ThemeName = 'default'

export interface Theme {
  name: ThemeName

  ui: {
    border: {
      /** #00B7F1 */
      main: string
    }
  }
  background: {
    window: {
      /** #47B5D8 50% */
      main: string
    }
  }
}
