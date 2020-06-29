import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class QueryRoleDto {
  @IsOptional()
  @Expose()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @Expose()
  @IsString()
  readonly text?: string;

  @IsOptional()
  @Expose()
  @IsString({ groups: ['normal', 'version'] })
  readonly type?: 'normal' | 'version';

  @IsOptional()
  @Expose()
  @IsMongoId()
  readonly organizationId?: string;
}
