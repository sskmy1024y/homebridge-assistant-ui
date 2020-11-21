import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs-extra'
import * as stream from 'stream'
import * as util from 'util'
import { FastifyRequest } from 'fastify'

interface HomebridgeConfig {
  bridge: {
    username: string
    pin: string
    name: string
    port: number
    bind?: string | string[]
  }
  platforms: Record<string, any>[]
  accessories: Record<string, any>[]
  plugins?: string[]
}

interface AssistantUIConfig {
  version: string
  config: {
    [userId: string]: AssistantConfig
  }
}

interface AssistantConfig {
  vrmPath: string
  assistantName: string
  camera: {
    position: {
      x: number
      y: number
      z: number
    }
    target: {
      x: number
      y: number
      z: number
    }
  }
}

@Injectable()
export class ConfigService {
  public name = 'homebridge-assistant-ui'

  public isProduction = process.env.NODE_ENV === 'production'
  public storagePath =
    process.env.AUI_STORAGE_PATH || this.isProduction
      ? path.resolve(os.homedir(), '.homebridge')
      : path.resolve(process.env.AUI_BASE_PATH, './data')
  public configPath = process.env.HB_CONFIG_PATH || path.resolve(this.storagePath, 'config.json')
  public assistantUiConfigPath =
    process.env.AUI_CONFIG_PATH || path.resolve(this.storagePath, 'assistant', 'config.json')
  public assistantVrmPath = process.env.AUI_VRM_PATH || path.resolve(this.storagePath, 'assistant', 'avator.vrm')

  // package.json
  public package = fs.readJsonSync(path.resolve(process.env.AUI_BASE_PATH, 'package.json'))

  public homebridgeConfig: HomebridgeConfig
  private _assistantConfig: AssistantUIConfig
  public port: number

  private _requestUserId: string

  constructor() {
    const homebridgeConfig = fs.readJSONSync(this.configPath)
    this.parseConfig(homebridgeConfig)

    const assistantConfig = fs.readJSONSync(this.assistantUiConfigPath, { throws: false })
    this.parseAssistantConfig(assistantConfig)
  }

  public setRequestUserId(userId: string) {
    this._requestUserId = userId
  }

  get assistantConfig() {
    const requestUserId = this._requestUserId
    return (
      this._assistantConfig.config[requestUserId] ??
      ({
        vrmPath: path.resolve(this.storagePath, 'assistant', 'avator.vrm'),
        assistantName: 'yui',
        camera: {
          position: { x: 0, y: 0.8, z: -1.2 },
          target: { x: 0, y: 0.3, z: 0 }
        }
      } as AssistantConfig)
    )
  }

  get assistantName() {
    const requestUserId = this._requestUserId
    return this._assistantConfig.config[requestUserId].assistantName
  }

  set assistantName(name: string) {
    const requestUserId = this._requestUserId
    this._assistantConfig.config[requestUserId].assistantName = name
  }

  get vrmPath() {
    const requestUserId = this._requestUserId
    return this._assistantConfig.config[requestUserId].vrmPath
  }

  set vrmPath(path: string) {
    const requestUserId = this._requestUserId
    this._assistantConfig.config[requestUserId].vrmPath = path
  }

  /**
   * Loads the config from the config.json
   */
  public parseConfig(homebridgeConfig) {
    this.homebridgeConfig = homebridgeConfig

    if (!this.homebridgeConfig.bridge) {
      this.homebridgeConfig.bridge = {} as this['homebridgeConfig']['bridge']
    }

    this.port = Array.isArray(this.homebridgeConfig.platforms)
      ? this.homebridgeConfig.platforms.find(x => x.platform === 'homebridge-assistant-ui').port
      : 4200
  }

  /**
   * Loads the config from the assistant/config.json
   */
  public parseAssistantConfig(assistantConfig) {
    if (assistantConfig != null) {
      this._assistantConfig = assistantConfig
    }

    this._assistantConfig.version = this.package.version
    this.save()
  }

  public save() {
    fs.outputJsonSync(this.configPath, this._assistantConfig)
    return { status: 'ok' }
  }

  public async uploadVRMFile(req: FastifyRequest, res) {
    //Check request is multipart
    if (!req.isMultipart()) {
      res.send(new BadRequestException('Request is not multipart'))
      return
    }

    // Uploading finished
    const onEnd = async (err: any) => {
      if (err) {
        res.send(new HttpException('Internal server error', 500))
        return
      }
      res.code(200).send({ status: 'ok', body: 'VRM uploaded successfully' })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handler = async (_field: string, file: any, _filename: string) => {
      const pipeline = util.promisify(stream.pipeline)
      const writeStream = fs.createWriteStream(this.assistantVrmPath) //File path
      try {
        await pipeline(file, writeStream)
      } catch (err) {
        console.error('Pipeline failed', err)
      }
    }

    const mp = await req.multipart(handler, onEnd)
    mp.on('field', (key: any, value: any) => {
      console.log('form-data', key, value)
    })
  }
}
