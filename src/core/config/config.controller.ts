import { Body, Controller, Get, Post, Put, Req, Res } from '@nestjs/common'
import { ConfigService } from './config.service'
import { AssistantConfigDto } from './config.dto'
import { FastifyRequest, FastifyReply } from 'fastify'

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

  @Post('vrm')
  async uploadVRMFile(@Req() req: FastifyRequest, @Res() res: FastifyReply<any>) {
    return await this.service.uploadVRMFile(req, res)
  }
}
