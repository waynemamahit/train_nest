import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(_: Request, __: Response, next: NextFunction) {
    console.log('Request!');
    next();
  }
}
