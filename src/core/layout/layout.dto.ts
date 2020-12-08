import { IsNotEmpty, IsNumber } from 'class-validator'

export class LayoutDto {
  @IsNumber()
  @IsNotEmpty()
  width: number

  @IsNumber()
  @IsNotEmpty()
  height: number

  @IsNumber()
  @IsNotEmpty()
  x: number

  @IsNumber()
  @IsNotEmpty()
  y: number
}
