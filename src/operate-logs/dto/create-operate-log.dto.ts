import { Expose } from 'class-transformer';
import { IsIP, IsObject, IsOptional, IsString } from 'class-validator';
import { Account } from 'src/accounts/account.schema';

export class CreateOperateLogDto {
  @Expose()
  user: Account;

  @IsOptional()
  @IsString()
  @Expose()
  organizationId: string;

  @IsOptional()
  @IsString()
  @Expose()
  operateType: 'create' | 'update' | 'delete' | 'unknown';

  @IsOptional()
  @IsString()
  @Expose()
  operateTarget: string;

  @IsOptional()
  @IsObject()
  @Expose()
  operateRawObject?: Record<string, any>;

  @IsOptional()
  @IsString()
  @Expose()
  operateStatus?: 'success' | 'failed';

  @IsOptional()
  @IsObject()
  @Expose()
  error?: Record<string, any>;

  @IsIP()
  @Expose()
  ip: string;

  @IsOptional()
  @IsObject()
  @Expose()
  requestBody?: Record<string, any>;
}
