import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LogOperateInterceptor implements NestInterceptor {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { body, method, url, user } = context.switchToHttp().getRequest();
    const operateName = this.reflector.get<string>(
      'operateName',
      context.getHandler(),
    );
    const data = {
      time: new Date(),
      operateName,
      body,
      method,
      url,
      user,
      status: undefined,
      response: undefined,
    };

    return next.handle().pipe(
      tap(() => {
        data.status = 'success';
        this.loggerService.log(data);
      }),
      catchError((err) => {
        data.status = 'failed';
        data.response = err.response;
        this.loggerService.log(data);
        return throwError(err);
      }),
    );
  }
}
