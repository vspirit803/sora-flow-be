import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { BaseQueryDto } from 'src/Common/BaseQueryDto';

export class QueryTaskDto extends BaseQueryDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly id?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly account?: string;

  @IsOptional()
  @Expose()
  readonly type?: string;

  @IsOptional()
  @Expose()
  readonly status?: string;

  @IsOptional()
  @Expose()
  readonly metadata?: Types.Map<any>;
}
