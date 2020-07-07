import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { AccountOrganization } from './AccountOrganization';

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
  @IsArray()
  @Type(() => AccountOrganization)
  @ValidateNested({ each: true })
  @Expose()
  readonly organizations: Array<AccountOrganization>;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @Expose()
  readonly roles: Array<string>;
}
