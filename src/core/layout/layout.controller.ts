import { Body, Controller, Get, Param, Put } from '@nestjs/common'
import { LayoutDto } from './layout.dto'
import { LayoutService } from './layout.service'

@Controller('layout')
export class LayoutController {
  constructor(private readonly service: LayoutService) {}

  @Get(':userId')
  getLayouts(@Param('userId') userId: string) {
    const userLayouts = this.service.getLayouts(userId)
    return { status: 'ok', body: userLayouts }
  }

  @Put(':userId/:accessoryUUID')
  setAssistantConfig(
    @Param('userId') userId: string,
    @Param('accessoryUUID') accessoryUUID: string,
    @Body() body: LayoutDto
  ) {
    return this.service.updateLayout({
      userId,
      accessoryUUID,
      width: body.width,
      height: body.height,
      x: body.x,
      y: body.y
    })
  }
}
