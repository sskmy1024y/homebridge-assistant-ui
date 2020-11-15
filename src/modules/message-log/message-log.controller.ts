import { Body, Controller, Get, Post } from '@nestjs/common'
import { MessageLogDto } from './message-log.dto'
import { MessageLogService } from './message-log.service'

@Controller('message-log')
export class MessageLogController {
  constructor(private readonly service: MessageLogService) {}

  @Get()
  getMessageLog() {
    return this.service.getMessageLog()
  }

  @Post()
  addMemo(@Body() body: MessageLogDto) {
    return this.service.addMessageLog(body.sender, body.message)
  }
}
