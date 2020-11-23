import { Theme } from 'theme'
import Colors from './colors'

const theme: Theme = {
  name: 'default',

  ui: {
    border: {
      /** #00B7F1 */
      main: Colors.Blue00
    }
  },

  background: {
    window: {
      /** #47B5D8 50% */
      main: Colors.Blue50
    }
  }
}

export { theme as default }
