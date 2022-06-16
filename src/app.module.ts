import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import {UserModule} from './modules/users/user.module';
import {PostModule} from './modules/posts/post.module'
import {AppService} from './app.service'
import { LoggerMiddleware } from './logger.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { roles } from './common/app.roles';
import { AccessControlModule } from 'nest-access-control';

@Module({
  imports: [UserModule,PostModule, AuthModule, AccessControlModule.forRoles(roles)],
  controllers: [AppController],
  //If using provider, not forget to add them here
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
