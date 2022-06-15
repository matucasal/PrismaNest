import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {UserModule} from './users/user.module';
import {PostService } from './post.service'
import {PrismaService} from './prisma.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  //If using provider, not forget to add them here
  providers: [PrismaService,PostService],
})
export class AppModule {}
