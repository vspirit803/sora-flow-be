import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
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
    const request = context.switchToHttp().getRequest() as Request;
    const { body, method, user } = request;
    const ip =
      (request.headers['x-forwarded-for'] as string) ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      '';
    if (method === 'GET') {
      return next.handle();
    }

    const operateTarget =
      this.reflector.get<string>('operateTarget', context.getHandler()) ??
      this.reflector.get<string>('operateTarget', context.getClass());
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
      user: user as Account,
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
