/**
 * Homebridge Entry Point
 */

import * as path from 'path'
import * as child_process from 'child_process'
import * as commander from 'commander'
import * as semver from 'semver'

let homebridge

export = api => {
  homebridge = api
  homebridge.registerPlatform('homebridge-assistant-ui', 'assistant-ui', HomebridgeAssistantUi)
}

class HomebridgeAssistantUi {
  log

  constructor(log, config) {
    this.log = log

    process.env.AUI_STORAGE_PATH = homebridge.user.storagePath()
    process.env.HB_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'config.json')
    process.env.AUI_PLUGIN_NAME = config.name || 'homebridge-assistant-ui'

    commander.allowUnknownOption().parse(process.argv)

    if (!semver.satisfies(process.version, '>=10.17.0')) {
      const msg = `Node.js v10.17.0 higher is required. You may experience issues running this plugin running on ${process.version}.`
      log.error(msg)
      log.warn(msg)
    }

    this.fork()
  }

  /**
   * Run plugin as a seperate node.js process
   */
  fork() {
    const ui = child_process.fork(path.resolve(__dirname, 'bin/fork'), null, {
      env: process.env
    })

    this.log(`Spawning homebridge-assistant-ui with PID`, ui.pid)

    ui.on('close', () => {
      process.kill(process.pid, 'SIGTERM')
    })

    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    ui.on('error', _err => {})
  }

  accessories(callback) {
    const accessories = []
    callback(accessories)
  }
}
