import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs-extra'

interface AssistantConfig {
  version: string
  vrmPath: string
  assistantName: string
}

@Injectable()
export class ConfigService {
  public name = 'homebridge-assistant-ui'

  public isProduction = process.env.NODE_ENV === 'production'
  public storagePath =
    process.env.AUI_STORAGE_PATH || this.isProduction
      ? path.resolve(os.homedir(), '.homebridge')
      : path.resolve(process.env.AUI_BASE_PATH, './data')
  public assistantConfigPath = process.env.AUI_CONFIG_PATH || path.resolve(this.storagePath, 'assistant', 'config.json')

  // package.json
  public package = fs.readJsonSync(path.resolve(process.env.AUI_BASE_PATH, 'package.json'))

  public assistantConfig: AssistantConfig

  constructor() {
    const assistantConfig = fs.readJSONSync(this.assistantConfigPath, { throws: false })

    if (assistantConfig === null) {
      this.parseAssistantConfig(this._defaultAssistantConfig())
      // TODO: move default vrm file.
      this.save()
    } else {
      this.parseAssistantConfig(assistantConfig)
    }
  }

  public parseAssistantConfig(assistantConfig) {
    this.assistantConfig = assistantConfig
  }

  get assistantName() {
    return this.assistantConfig.assistantName
  }

  set assistantName(name: string) {
    this.assistantConfig.assistantName = name
  }

  get vrmPath() {
    return this.assistantConfig.vrmPath
  }

  set vrmPath(path: string) {
    this.assistantConfig.vrmPath = path
  }

  public save() {
    fs.outputJsonSync(this.assistantConfigPath, this.assistantConfig)
    return { status: 'ok' }
  }

  private _defaultAssistantConfig() {
    const auiVersion = this.package.version
    return {
      version: auiVersion,
      assistantName: 'yui',
      vrmPath: path.resolve(this.storagePath, 'assistant', 'avator.vrm')
    }
  }
}
