import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/ban-types
  use(req: Request, res: Response, next: Function) {
    const { originalUrl, method, params, query, body } = req;

    Logger.debug(`
      R:  U ${originalUrl} - M ${method} - P ${JSON.stringify(params)} -
          Q ${JSON.stringify(query)} - B ${JSON.stringify(body)}
    `);
    next();
  }
}