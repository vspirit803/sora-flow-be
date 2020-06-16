import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LogOperateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { body, method, url } = context.switchToHttp().getRequest();

    const data = { body, method, url, status: undefined };

    return next.handle().pipe(
      tap(() => {
        data.status = 'success';
        console.log(data);
      }),
      catchError((err) => {
        data.status = 'failed';
        console.log(data);
        return throwError(err);
      }),
    );
  }
}
