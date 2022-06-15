import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  IsDefined,
  IsEnum,
  IsString,
  IsOptional,
} from 'class-validator';


export class CreateUserDto {
  @ApiProperty({
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty(
    {required: true}
  )
  @IsNotEmpty()
  @IsString()
  name: string;

}