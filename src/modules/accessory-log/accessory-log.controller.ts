import { Body, Controller, Get, Post } from '@nestjs/common'
import { AccessoryLogDto } from './accessory-log.dto'
import { AccessoryLogService } from './accessory-log.service'

@Controller('accessory-log')
export class AccessoryLogController {
  constructor(private readonly service: AccessoryLogService) {}

  @Get()
  getAccessoryLog() {
    return this.service.getAccessoryLog()
  }

  @Post()
  addMemo(@Body() body: AccessoryLogDto) {
    return this.service.addAccessoryLog(body.accessoryUUID, body.accessoryType, body.value)
  }
}
