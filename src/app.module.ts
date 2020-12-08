import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageLogModule } from './modules/message-log/message-log.module'
import { AccessoryLogModule } from './modules/accessory-log/accessory-log.module'
import { ConfigModule } from './core/config/config.module'
import { AuthModule } from './core/auth/auth.module'
import { LayoutModule } from './core/layout/layout.module'

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, AccessoryLogModule, MessageLogModule, ConfigModule, LayoutModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
