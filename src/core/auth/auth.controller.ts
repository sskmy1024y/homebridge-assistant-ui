import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common'

import { FastifyRequest } from 'fastify'
import { ConfigService } from '../config/config.service'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {}

  @Post('config')
  @HttpCode(200)
  getAssistantConfig(
    @Body() { username, password }: { username: string; password: string },
    @Req() req: FastifyRequest
  ) {
    const hbServicePort = this.configService.hbServicePort
    const result = this.authService.hbServiceAuth({ req, username, password, port: hbServicePort })

    // this.configService.setRequestUserId(body.userId)
    // const config = this.configService.uiSettings(req)
    return { status: 'ok', body: result as any }
  }
}
