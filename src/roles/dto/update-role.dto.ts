import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly name?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly text?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  @Expose()
  readonly authorizedOperations?: Array<string>;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organizationId?: string;
}
