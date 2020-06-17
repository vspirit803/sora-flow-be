import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LogOperateInterceptor implements NestInterceptor {
  // constructor(public operateName: string) {}
  constructor(private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { body, method, url, user } = context.switchToHttp().getRequest();
    console.log(this.loggerService);
    const data = {
      time: new Date(),
      // operateName: this.operateName,
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
        console.log(data);
      }),
      catchError((err) => {
        data.status = 'failed';
        data.response = err.response;
        console.log(data);
        return throwError(err);
      }),
    );
  }
}
