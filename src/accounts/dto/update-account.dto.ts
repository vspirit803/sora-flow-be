import { Expose } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsObject,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';

import { IsOrganizationRoleMap } from './IsOrganizationRoleMap';

export class UpdateAccountDto {
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
  readonly nickname?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly password?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly roleId?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  @Expose()
  readonly organizations: Array<string>;

  @IsOptional()
  @IsObject()
  @Validate(IsOrganizationRoleMap, {
    message: 'organizationRoleMap must be { [key: MongoId]: Array<MongoId> }',
  })
  @Expose()
  readonly organizationRoleMap: Record<string, Array<string>>;
}
