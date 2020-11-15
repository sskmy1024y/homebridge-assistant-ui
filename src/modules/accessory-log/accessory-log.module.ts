import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AccessoryLog } from '../../entities/accessoryLog.entity'
import { AccessoryLogController } from './accessory-log.controller'
import { AccessoryLogService } from './accessory-log.service'

@Module({
  controllers: [AccessoryLogController],
  imports: [TypeOrmModule.forFeature([AccessoryLog])],
  providers: [AccessoryLogService]
})
export class AccessoryLogModule {}
