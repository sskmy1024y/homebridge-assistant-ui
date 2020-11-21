import { Accessory } from './Accessory'
import { HomeKitTypes } from './HomeKitTypes'
import { ServiceEvent } from 'models/services'
import { ServiceType } from '@oznu/hap-client'
import { WsService } from 'models/WsService'

export interface SwitchType extends ServiceType {
  type: typeof HomeKitTypes.Switch
}

export class Switch extends Accessory {
  constructor(accessory: SwitchType) {
    super(accessory)
  }

  get value(): boolean {
    return this.accessory.values?.On ?? false
  }

  updateValue(value: boolean, wsService: WsService) {
    const characteristic = this.accessory.serviceCharacteristics.find(
      x => x.type === 'On'
    )

    if (wsService && characteristic && this.value !== value) {
      wsService.socket.emit(ServiceEvent.accessories.AccessoryControl, {
        set: {
          uniqueId: this.accessory.uniqueId,
          aid: this.accessory.aid,
          siid: this.accessory.iid,
          iid: characteristic.iid,
          value
        }
      })
    }
  }
}
