import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateApplicationDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly name?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly lastModifier?: string;

  @IsOptional()
  @IsArray()
  @Expose()
  readonly formModel?: Array<any>;
}
