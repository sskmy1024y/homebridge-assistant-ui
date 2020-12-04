import { Module } from '@nestjs/common'
import { LayoutController } from './layout.controller'
import { LayoutService } from './layout.service'

@Module({
  providers: [LayoutService],
  controllers: [LayoutController],
  exports: [LayoutService]
})
export class LayoutModule {}
