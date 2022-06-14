import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {UserService } from './user.service';
import {PostService } from './post.service'
import {PrismaService} from './prisma.service';

@Module({
  //imports: [],
  controllers: [AppController],
  //If using provider, not forget to add them here
  providers: [UserService,PrismaService,PostService],
})
export class AppModule {}
