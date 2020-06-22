import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AccountOrganization } from './AccountOrganization';

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
  @Type(() => AccountOrganization)
  @ValidateNested({ each: true })
  @Expose()
  readonly organizations: Array<AccountOrganization>;
}
