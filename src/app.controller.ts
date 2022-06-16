import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { ACGuard, UseRoles } from 'nest-access-control';

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

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }


  @Get('roles')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'post',
    action: 'read',
    possession: 'any',
  })
  roles(@Request() req) {
    return 'test roles';
  }
}