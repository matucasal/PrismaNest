import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {UserModule} from './modules/users/user.module';
import {PostModule} from './modules/posts/post.module'
import {AppService} from './app.service'

@Module({
  imports: [UserModule,PostModule ],
  controllers: [AppController],
  //If using provider, not forget to add them here
  providers: [AppService],
})
export class AppModule {}
