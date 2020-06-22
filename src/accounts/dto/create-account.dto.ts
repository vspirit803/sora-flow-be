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

// import { IsOrganizationRoleMap } from './IsOrganizationRoleMap';

export class CreateAccountDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly nickname: string;

  @IsString()
  @Expose()
  readonly password: string;

  @IsMongoId()
  @Expose()
  readonly roleId: string;

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
