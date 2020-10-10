import { Expose } from 'class-transformer';
import { IsIP, IsOptional, IsString } from 'class-validator';
import { BaseQueryDto } from 'src/Common/BaseQueryDto';

export class QueryOperateLogDto extends BaseQueryDto {
  @IsOptional()
  @IsString()
  @Expose()
  organizationId?: string;

  @IsOptional()
  @IsString()
  @Expose()
  operateType?: 'create' | 'update' | 'delete' | 'unknown';

  @IsOptional()
  @IsString()
  @Expose()
  operateTarget?: string;

  @IsOptional()
  @IsString()
  @Expose()
  operateStatus?: 'success' | 'failed';

  @IsOptional()
  @IsIP()
  @Expose()
  ip?: string;
}
