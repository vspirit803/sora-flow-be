import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class QueryApplicationRecordDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly application?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly id?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly account?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;
}
