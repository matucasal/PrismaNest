import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserModel} from '@prisma/client';


@Controller()
export class UserController{
  constructor(private userService: UserService) {}

  @Post('user')
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
      return this.userService.createUser(createUserDto);
    }
}
