import { Injectable } from '@nestjs/common'
import * as path from 'path'
import * as os from 'os'
import * as fs from 'fs-extra'

interface LayoutConfig {
  [userId: string]: {
    [accessoryUUID: string]: {
      width: number
      height: number
      x: number
      y: number
    }
  }
}

@Injectable()
export class LayoutService {
  public isProduction = process.env.NODE_ENV === 'production'
  public storagePath =
    process.env.AUI_STORAGE_PATH || this.isProduction
      ? path.resolve(os.homedir(), '.homebridge')
      : path.resolve(process.env.AUI_BASE_PATH, './data')
  public layoutJsonPath = process.env.AUI_LAYOUT_PATH || path.resolve(this.storagePath, 'assistant', 'layout.json')

  private _layouts: LayoutConfig

  constructor() {
    this._layouts = fs.readJSONSync(this.layoutJsonPath, { throws: false }) ?? {}
  }

  public save() {
    fs.outputJsonSync(this.layoutJsonPath, this._layouts)
    return { status: 'ok' }
  }

  public updateLayout({
    userId,
    accessoryUUID,
    width,
    height,
    x,
    y
  }: {
    userId: string
    accessoryUUID: string
    width: number
    height: number
    x: number
    y: number
  }) {
    const userLayouts = this._layouts[userId]

    if (!userLayouts) {
      this._layouts[userId] = {}
    }

    const updateLayout = {
      width,
      height,
      x,
      y
    }
    this._layouts[userId][accessoryUUID] = updateLayout

    this.save()

    return { status: 'ok' }
  }

  public getLayouts(userId) {
    console.log(this._layouts)
    const userLayouts = this._layouts[userId]

    return userLayouts ?? {}
  }
}
