import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { OperateLogInterceptor } from 'src/Interceptors/operate-log.interceptor';

/**
 * 记录操作日志
 * @param operateName 操作名称
 */
export function UseOperateLog(operateName: string) {
  return applyDecorators(
    SetMetadata('operateTarget', operateName),
    UseInterceptors(OperateLogInterceptor),
  );
}
