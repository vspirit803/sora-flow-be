import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly text: string;

  @IsArray()
  @IsMongoId({
    each: true,
  })
  @Expose()
  readonly authorizedOperations: Array<string>;

  @IsOptional()
  @IsString({ groups: ['normal', 'version'] })
  @Expose()
  readonly type?: 'normal' | 'version';

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organizationId?: string;
}
