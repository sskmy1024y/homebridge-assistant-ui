import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AccessoryLog } from '../../entities/accessoryLog.entity'

@Injectable()
export class AccessoryLogService {
  constructor(
    @InjectRepository(AccessoryLog)
    private readonly accessoryLogRepository: Repository<AccessoryLog>
  ) {}

  addAccessoryLog(uuid: string, type: string, value: string) {
    const accessoryLog = new AccessoryLog()
    accessoryLog.accessoryUuid = uuid
    accessoryLog.accessoryType = type
    accessoryLog.value = value
    accessoryLog.createdAt = new Date()

    return this.accessoryLogRepository.insert(accessoryLog)
  }

  getAccessoryLog(take = 20) {
    return this.accessoryLogRepository.find({ take })
  }
}
