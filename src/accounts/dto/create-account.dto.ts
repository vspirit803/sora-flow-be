import { Expose, Type } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';

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

  @IsOptional()
  @IsArray()
  @Type(() => AccountOrganization)
  @ValidateNested({ each: true })
  @Expose()
  readonly organizations: Array<AccountOrganization>;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organizationId: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @Expose()
  readonly roles: Array<string>;
}
