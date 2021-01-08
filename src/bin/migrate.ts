#!/usr/bin/env node

process.title = 'homebridge-assistant-ui migration'

import * as os from 'os'
import * as path from 'path'
import { execSync } from 'child_process'

if (!process.env.AUI_STORAGE_PATH) {
  process.env.AUI_STORAGE_PATH = path.resolve(os.homedir(), '.homebridge')
}

process.env.HB_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'config.json')
process.env.AUI_CONFIG_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'assistant', 'config.json')
process.env.AUI_DATABASE_PATH = path.resolve(process.env.AUI_STORAGE_PATH, 'assistant', 'hb-assistant.sqlite')

execSync(`npm run migrate`, {
  env: process.env,
  cwd: path.resolve(__dirname, '../..')
})
