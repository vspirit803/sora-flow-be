import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

import { ApplicationStatus } from '../application.schema';

export class CreateApplicationDto {
  @IsOptional()
  @IsString()
  @Expose()
  readonly name?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly creator?: string;

  @IsOptional()
  @IsString({ groups: ['Designing', 'Published', 'Archive'] })
  @Expose()
  readonly status: ApplicationStatus;

  @IsOptional()
  @IsArray()
  @Expose()
  readonly formModel?: Array<any>;
}
