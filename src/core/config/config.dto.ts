import { IsString } from 'class-validator'

export class AssistantConfigDto {
  @IsString()
  vrmPath: string

  @IsString()
  assistantName: string
}
