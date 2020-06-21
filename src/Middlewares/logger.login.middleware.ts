import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**登陆日志 */
@Injectable()
export class LoggerLoginMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log(req.ip, req.body.name);
    next();
  }
}
