import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class QueryOrganizationDto {
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
  readonly versionId?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly supervisorId?: string;
}
