import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateApplicationRecordDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly account?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @Expose()
  readonly data?: Record<string, any>;
}
