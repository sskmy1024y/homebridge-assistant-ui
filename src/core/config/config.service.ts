import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs-extra'
import * as stream from 'stream'
import * as util from 'util'
import { FastifyRequest, FastifyReply } from 'fastify'

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

  // package.json
  public package = fs.readJsonSync(path.resolve(process.env.AUI_BASE_PATH, 'package.json'))

  public homebridgeConfig: HomebridgeConfig
  private _assistantUIConfig: AssistantUIConfig

  private _requestUserId: string

  constructor() {
    const homebridgeConfig = fs.readJSONSync(this.configPath)
    this.parseConfig(homebridgeConfig)

    const assistantConfig = fs.readJSONSync(this.assistantUiConfigPath, { throws: false })
    this.parseAssistantConfig(assistantConfig)
  }

  public setRequestUserId(userId: string) {
    this._requestUserId = userId

    if (!this._assistantUIConfig?.config?.[this._requestUserId]) {
      this._assistantUIConfig.config = {
        ...(this._assistantUIConfig?.config ?? {}),
        [this._requestUserId]: {
          vrmPath: path.resolve(this.storagePath, 'assistant', 'avator.vrm'),
          assistantName: 'yui',
          camera: {
            position: { x: 0, y: 1.5, z: -1.2 },
            target: { x: 0, y: 1.2, z: 0 }
          }
        }
      }
    }
  }

  get assistantName() {
    const requestUserId = this._requestUserId
    return this._assistantUIConfig.config[requestUserId].assistantName
  }

  set assistantName(name: string) {
    const requestUserId = this._requestUserId
    this._assistantUIConfig.config[requestUserId].assistantName = name
  }

  get vrmPath() {
    const requestUserId = this._requestUserId
    return this._assistantUIConfig.config[requestUserId].vrmPath
  }

  set vrmPath(path: string) {
    const requestUserId = this._requestUserId
    this._assistantUIConfig.config[requestUserId].vrmPath = path
  }

  get auiPort() {
    const assistantUIConfig = this.homebridgeConfig?.platforms?.find(x => x.platform === 'homebridge-assistant-ui')
    return assistantUIConfig?.port ?? 4200
  }

  get hbServicePort() {
    const hbServiceConfig = this.homebridgeConfig?.platforms?.find(x => x.platform === 'config')
    return hbServiceConfig?.port ?? null
  }

  /**
   * Loads the config from the config.json
   */
  public parseConfig(homebridgeConfig) {
    this.homebridgeConfig = homebridgeConfig

    if (!this.homebridgeConfig.bridge) {
      this.homebridgeConfig.bridge = {} as this['homebridgeConfig']['bridge']
    }
  }

  /**
   * Loads the config from the assistant/config.json
   */
  public parseAssistantConfig(assistantConfig) {
    if (assistantConfig != null) {
      this._assistantUIConfig = assistantConfig
    }

    this._assistantUIConfig = {
      ...(this._assistantUIConfig ?? { config: {} }),
      version: this.package.version
    }

    this.save()
  }

  /**
   * Settings that are sent to the UI
   */
  public uiSettings(req: FastifyRequest) {
    const requestUserId = this._requestUserId

    const config = this._assistantUIConfig.config[requestUserId]
    const vrmPath = `${req.protocol}://${req.hostname}/api/config/vrm/${requestUserId}`

    if (!fs.existsSync(path.resolve(config.vrmPath))) {
      fs.copySync(path.resolve(process.env.AUI_BASE_PATH, 'dist/assets', 'avator.vrm'), path.resolve(config.vrmPath))
    }

    return {
      version: this._assistantUIConfig.version,
      vrmPath,
      hbServicePort: this.hbServicePort,
      assistantName: config.assistantName,
      camera: config.camera
    }
  }

  public save() {
    fs.outputJsonSync(this.assistantUiConfigPath, this._assistantUIConfig)
    return { status: 'ok' }
  }

  public async getVRMFile(res: FastifyReply<any>) {
    const stream = fs.createReadStream(path.resolve(this.vrmPath))
    res.send(stream)
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
      const writeStream = fs.createWriteStream(this.vrmPath) //File path
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
