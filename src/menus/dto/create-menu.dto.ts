import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly icon?: string;

  @IsString()
  @Expose()
  readonly type: string;

  @IsString()
  @Expose()
  readonly url: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly parentId?: string;
}
