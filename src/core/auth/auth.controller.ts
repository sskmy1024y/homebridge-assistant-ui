import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common'

import { FastifyRequest } from 'fastify'
import { ConfigService } from '../config/config.service'
import { AuthService } from './auth.service'

enum AuthType {
  withPassword,
  withToken
}

@Controller('auth')
export class AuthController {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {}

  @Post('config')
  @HttpCode(200)
  getAssistantConfig(
    @Body()
    body:
      | { username: string; password: string; type: AuthType.withPassword }
      | { username: string; token: string; type: AuthType.withToken },
    @Req() req: FastifyRequest
  ) {
    const hbServicePort = this.configService.hbServicePort
    this.authService.prepareHbServiceRequest(req, hbServicePort)
    if (body.type === AuthType.withPassword) {
      this.authService.hbServiceAuth(body.username, body.password)
    } else {
      this.authService.hbServiceToken = body.token
    }

    const userId = this.authService.hbServiceGetUserId(body.username)

    if (userId) {
      this.configService.setRequestUserId(userId)
      const config = this.configService.uiSettings(req)

      return {
        status: 'ok',
        body: {
          ...config,
          hbServiceHost: this.authService.hbServiceHostname,
          hbServiceUserId: userId,
          hbServiceToken: this.authService.hbServiceToken
        } as any
      }
    } else {
      return { status: 'error', message: 'Error in hb-service request' }
    }
  }
}
