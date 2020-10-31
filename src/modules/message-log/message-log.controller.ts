import { Controller, Get, Param, Post } from '@nestjs/common';
import { MessageLogService } from './message-log.service';

@Controller('message-log')
export class MessageLogController {
  constructor(private readonly service: MessageLogService) { }

  @Get()
  getMessageLog() {
      return this.service.getMessageLog();
  }

  @Post()
  addMemo(@Param('sender') sender: string, @Param('message') message: string) {
      return this.service.addMessageLog(sender, message);
  }
}
