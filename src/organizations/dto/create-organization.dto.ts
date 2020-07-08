import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsMongoId()
  @Expose()
  readonly versionId: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly supervisorId: string;
}
