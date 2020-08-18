import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class QueryApplicationDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly id?: string;

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
  @IsMongoId()
  @Expose()
  readonly lastModifier?: string;
}
