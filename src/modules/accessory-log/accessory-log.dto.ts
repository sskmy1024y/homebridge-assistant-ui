import { IsString, IsNotEmpty, IsDefined } from 'class-validator'

export class AccessoryLogDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accessoryUUID: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  accessoryType: string

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  value: string
}
