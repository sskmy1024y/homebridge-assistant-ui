import { Body, Controller, Get, Put } from '@nestjs/common'
import { ConfigService } from './config.service'
import { AssistantConfigDto } from './config.dto'

@Controller('config')
export class ConfigController {
  constructor(private readonly service: ConfigService) {}

  @Get()
  getAssistantConfig() {
    const config = this.service.assistantConfig
    return { status: 'ok', body: config as any }
  }

  @Put()
  setAssistantConfig(@Body() body: AssistantConfigDto) {
    this.service.assistantName = body?.assistantName ?? this.service.assistantName
    this.service.vrmPath = body?.vrmPath ?? this.service.vrmPath

    this.service.save()
    return { status: 'ok' }
  }
}
