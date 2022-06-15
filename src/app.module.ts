import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {UserModule} from './users/user.module';
import {PostModule} from './posts/post.module'
import {AppService} from './app.service'
import {PrismaService} from './prisma.service';

@Module({
  imports: [UserModule,PostModule ],
  controllers: [AppController],
  //If using provider, not forget to add them here
  providers: [AppService],
})
export class AppModule {}
