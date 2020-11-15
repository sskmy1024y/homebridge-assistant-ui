import { BadRequestException, HttpException, Injectable } from '@nestjs/common'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs-extra'
import * as stream from 'stream'
import * as util from 'util'
import { FastifyRequest } from 'fastify'

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
  public assistantVrmPath = process.env.AUI_VRM_PATH || path.resolve(this.storagePath, 'assistant', 'avator.vrm')

  // package.json
  public package = fs.readJsonSync(path.resolve(process.env.AUI_BASE_PATH, 'package.json'))

  public assistantConfig: AssistantConfig

  constructor() {
    const assistantConfig = fs.readJSONSync(this.assistantConfigPath, { throws: false })

    if (assistantConfig === null) {
      this.parseAssistantConfig(this._defaultAssistantConfig())
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

  private _defaultAssistantConfig() {
    const auiVersion = this.package.version
    // TODO: move default vrm file.
    return {
      version: auiVersion,
      assistantName: 'yui',
      vrmPath: path.resolve(this.storagePath, 'assistant', 'avator.vrm')
    }
  }
}
