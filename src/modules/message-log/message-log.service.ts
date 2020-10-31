import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageLog } from '../../entities/messageLog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageLogService {
  constructor(
    @InjectRepository(MessageLog)
    private readonly messageLogRepository: Repository<MessageLog>
  ) { }

  addMessageLog(sender: string, message: string) {
    const messageLog = new MessageLog()
    messageLog.sender = sender;
    messageLog.message = message;

    return this.messageLogRepository.insert(messageLog)
  }

  getMessageLog(take = 20) {
    return this.messageLogRepository.find({take})
  }
}
