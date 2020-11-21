import { IsDefined, IsNotEmpty, IsString } from 'class-validator'

export class AssistantConfigDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string

  @IsString()
  vrmPath: string

  @IsString()
  assistantName: string
}
