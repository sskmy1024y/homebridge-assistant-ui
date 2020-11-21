import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MessageLog } from '../../entities/messageLog.entity'
import { MessageLogController } from './message-log.controller'
import { MessageLogService } from './message-log.service'

@Module({
  controllers: [MessageLogController],
  imports: [TypeOrmModule.forFeature([MessageLog])],
  providers: [MessageLogService]
})
export class MessageLogModule {}
