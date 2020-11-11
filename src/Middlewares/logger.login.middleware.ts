import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**登陆日志 */
@Injectable()
export class LoggerLoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const ip =
      (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress || req.socket.remoteAddress || '';
    console.log(ip, req.body.name);
    next();
  }
}
