import { IsDefined, IsNumber } from 'class-validator'

export class LayoutDto {
  @IsNumber()
  @IsDefined()
  width: number

  @IsNumber()
  @IsDefined()
  height: number

  @IsNumber()
  @IsDefined()
  x: number

  @IsNumber()
  @IsDefined()
  y: number
}
