import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';


@Injectable()
export class AppService {
  constructor(
  ) {}

  getHello(): string {
    console.log('appService.getHello');
    return 'Hello from Matucasal Repo!';
  }
  root(): string {
    Logger.log('App is running');
    return 'OK';
  }


}