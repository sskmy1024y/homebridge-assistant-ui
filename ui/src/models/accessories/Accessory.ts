import { ServiceType } from '@oznu/hap-client'
import { WsService } from 'models/WsService'

export abstract class Accessory {
  protected constructor(protected accessory: ServiceType) {}

  /**
   * Update status (value) of accessories
   * @param value new Value
   */
  abstract updateValue(value: unknown, ws: WsService): void

  get value() {
    return this.accessory.values
  }

  get uuid() {
    return this.accessory.uuid
  }

  get serviceName() {
    return this.accessory.serviceName
  }

  get type() {
    return this.accessory.type
  }
}
