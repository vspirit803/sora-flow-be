import { Expose } from 'class-transformer';
import { IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto {
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
  readonly icon?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly url?: string;

  @IsOptional()
  @IsBoolean()
  @Expose()
  readonly visible?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  readonly enable?: boolean;
}
