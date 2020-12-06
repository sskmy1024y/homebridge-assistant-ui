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
    this.authService.prepareHbServiceRequest(req, hbServicePort)
    this.authService.hbServiceAuth(username, password)
    const userId = this.authService.hbServiceGetUserId(username)
    if (userId) {
      this.configService.setRequestUserId(userId)
      const config = this.configService.uiSettings(req)

      return {
        status: 'ok',
        body: { ...config, hbServiceHost: this.authService.hbServiceHostname, hbServiceUserId: userId } as any
      }
    } else {
      return { status: 'error', message: 'Error in hb-service request' }
    }
  }
}
