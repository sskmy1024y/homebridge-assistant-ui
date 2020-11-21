import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageLogModule } from './modules/message-log/message-log.module'
import { AccessoryLogModule } from './modules/accessory-log/accessory-log.module'
import { ConfigModule } from './core/config/config.module'

@Module({
  imports: [TypeOrmModule.forRoot(), AccessoryLogModule, MessageLogModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
