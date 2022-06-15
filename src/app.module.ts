import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import {UserController} from './controllers/user.controller';
import {UserService } from './services/user.service';
import {PostService } from './services/post.service'
import {PrismaService} from './services/prisma.service';

@Module({
  //imports: [],
  controllers: [AppController, UserController],
  //If using provider, not forget to add them here
  providers: [UserService,PrismaService,PostService],
})
export class AppModule {}
