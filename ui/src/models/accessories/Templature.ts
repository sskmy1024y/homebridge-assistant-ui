import { Accessory } from './Accessory'
import { HomeKitTypes } from './HomeKitTypes'
import { ServiceType } from '@oznu/hap-client'
import { WsService } from 'models/WsService'

export interface TemplatureType extends ServiceType {
  type: typeof HomeKitTypes.TemperatureSensor
}

export class Templature extends Accessory {
  constructor(accessory: TemplatureType) {
    super(accessory)
  }

  get value(): number | null {
    const type = this.accessory.serviceCharacteristics.find(obj => obj.type)
      ?.type
    return type ? this.accessory.values[type] : null
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateValue(value: number | null, wsService: WsService) {
    console.error('This accessory CANNOT update value.')
  }

  get unit() {
    return this.accessory.serviceCharacteristics.find(obj => obj.unit)?.unit
  }
}
