import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteOrganizationDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
