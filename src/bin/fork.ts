process.title = 'homebridge-assistant-ui'

setInterval(() => {
  if (!process.connected) {
    process.exit(1)
  }
}, 10000)

process.on('disconnect', () => {
  process.exit()
})

import('../main')
