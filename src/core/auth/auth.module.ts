import { Module } from '@nestjs/common'
import { ConfigModule } from '../config/config.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [ConfigModule],
  exports: [AuthService]
})
export class AuthModule {}
