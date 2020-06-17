import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle();
    // .pipe(
    //   tap(() => console.log(context.getArgs())),
    //   catchError((err) => {
    //     console.log('发生了错误');
    //     return throwError(err);
    //   }),
    // );
  }
}
