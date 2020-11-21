import { IsString, IsNotEmpty, IsDefined } from 'class-validator'

export class MessageLogDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  sender: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  message: string
}
