import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class QueryDepartmentDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly id?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly name?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly supervisor?: string;
}
