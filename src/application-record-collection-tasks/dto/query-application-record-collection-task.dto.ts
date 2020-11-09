import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';
import { BaseQueryDto } from 'src/Common/BaseQueryDto';

export class QueryApplicationRecordCollectionTaskDto extends BaseQueryDto {
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
  readonly publisher?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly application?: string;

  @IsOptional()
  @Expose()
  readonly status?: string;
}
