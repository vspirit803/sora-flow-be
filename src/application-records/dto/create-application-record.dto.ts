import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateApplicationRecordDto {
  @IsOptional()
  @IsString()
  @Expose()
  readonly application?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly account?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @Expose()
  readonly data: Record<string, any>;
}
