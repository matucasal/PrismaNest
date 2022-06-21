//title: string; content?: string; authorEmail: string
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString
} from 'class-validator';


export class CreatePostDto {


  @ApiProperty(
    {required: true}
  )
  @IsNotEmpty()
  @IsString()
  title: string;



  @ApiProperty(
    {required: true}
  )
  @IsNotEmpty()
  @IsString()
  content: string;



  @ApiProperty(
    {required: true}
  )
  @IsNotEmpty()
  userId: number;



}