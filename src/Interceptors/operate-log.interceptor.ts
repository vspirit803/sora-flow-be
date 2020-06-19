import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CreateOperateLogDto } from 'src/operate-logs/dto';
import { OperateLogsService } from 'src/operate-logs/operate-logs.service';

@Injectable()
export class OperateLogInterceptor implements NestInterceptor {
  constructor(
    private readonly operateLogsService: OperateLogsService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { body, method, user, ip } = context.switchToHttp().getRequest();
    const operateTarget = this.reflector.get<string>(
      'operateTarget',
      context.getHandler(),
    );
    let operateType: 'create' | 'update' | 'delete' | 'unknown';
    switch (method) {
      case 'POST':
        operateType = 'create';
        break;
      case 'PATCH':
        operateType = 'update';
        break;
      case 'DELETE':
        operateType = 'delete';
        break;
      default:
        operateType = 'unknown';
    }

    const data: CreateOperateLogDto = {
      ip,
      operateTarget,
      operateType,
      user,
    };

    return next.handle().pipe(
      tap(() => {
        this.operateLogsService.create(data);
      }),
      catchError((err) => {
        data.operateStatus = 'failed';
        data.error = err.response;
        data.requestBody = body;
        this.operateLogsService.create(data);
        return throwError(err);
      }),
    );
  }
}