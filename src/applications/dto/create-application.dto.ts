import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

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
  readonly status: string;

  @IsOptional()
  @IsArray()
  @Expose()
  readonly formModel?: Array<any>;
}
