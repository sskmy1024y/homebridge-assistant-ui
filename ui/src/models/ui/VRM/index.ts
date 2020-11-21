import { InitCamera } from './Camera'
import { Vector3 } from 'three'

export * from './Camera'

export const importLoad = (obj: any): [string] => {
  return [obj.name]
}

export interface VRMConfig {
  name: string
  model: string
  init: {
    camera?: InitCamera
  }
}

export const importVRMConfig = (obj: any): VRMConfig => {
  if (typeof obj.name !== 'string' && typeof obj.model !== 'string') {
    throw new SyntaxError('Cannnot parse VRM configure file')
  }

  const config = {
    name: obj.name,
    model: obj.model,
    motion: obj?.motion ?? [],
    init: {}
  } as VRMConfig

  if (obj?.init?.camera) {
    config.init.camera = {}

    /* Default Camera position */
    const position = obj.init.camera?.position
    if ('x' in position && 'y' in position && 'z' in position) {
      config.init.camera.position = new Vector3(
        position.x,
        position.y,
        position.z
      )
    }

    /* Default target position */
    const target = obj.init.camera?.target
    if ('x' in target && 'y' in target && 'z' in target) {
      config.init.camera.target = new Vector3(target.x, target.y, target.z)
    }
  }

  return config
}
