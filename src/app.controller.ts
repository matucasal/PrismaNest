import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import {RolesGuard} from './guards/roles.guard';
import {Role} from './enums/role.enum'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    ) {}

  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/diagnostic/echo')
  echo(): string {
    return 'echo';
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard )
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Get('roles')
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  roles(@Request() req) {
    return 'test roles';
  }
}