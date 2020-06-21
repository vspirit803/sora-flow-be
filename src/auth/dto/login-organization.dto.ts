import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class LoginOrganizationDto {
  @IsMongoId()
  @Expose()
  readonly organizationId: string;
}
