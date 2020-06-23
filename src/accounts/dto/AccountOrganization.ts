import { Expose } from 'class-transformer';
import { IsArray, IsMongoId } from 'class-validator';

export class AccountOrganization {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsArray()
  @IsMongoId({ each: true })
  @Expose()
  readonly roles: Array<string>;
}
