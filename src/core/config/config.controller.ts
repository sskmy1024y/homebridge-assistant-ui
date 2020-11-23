import { Body, Controller, Get, HttpCode, Param, Post, Put, Req, Res } from '@nestjs/common'
import { ConfigService } from './config.service'
import { AssistantConfigDto } from './config.dto'
import { FastifyRequest, FastifyReply } from 'fastify'

@Controller('config')
export class ConfigController {
  constructor(private readonly service: ConfigService) {}

  @Post()
  @HttpCode(200)
  getAssistantConfig(@Body() body: { userId: string }, @Req() req: FastifyRequest) {
    this.service.setRequestUserId(body.userId)
    const config = this.service.uiSettings(req)
    return { status: 'ok', body: config as any }
  }

  @Put()
  setAssistantConfig(@Body() body: AssistantConfigDto) {
    this.service.setRequestUserId(body.userId)
    this.service.assistantName = body?.assistantName ?? this.service.assistantName
    this.service.vrmPath = body?.vrmPath ?? this.service.vrmPath

    this.service.save()
    return { status: 'ok' }
  }

  @Post('vrm')
  async uploadVRMFile(@Req() req: FastifyRequest, @Res() res: FastifyReply<any>) {
    return await this.service.uploadVRMFile(req, res)
  }

  @Get('vrm/:userId')
  async getVRMFile(@Param('userId') userId: string, @Res() res: FastifyReply<any>) {
    this.service.setRequestUserId(userId)
    return await this.service.getVRMFile(res)
  }
}
