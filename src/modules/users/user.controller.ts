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
import { User as UserModel} from '@prisma/client';


@Controller()
export class UserController{
  constructor(private userService: UserService) {}

  @Post('user')
  async signupUser(
    @Body() userData: {name?: string; email: string}): Promise<UserModel> {
      return this.userService.createUser(userData);
    }
}
