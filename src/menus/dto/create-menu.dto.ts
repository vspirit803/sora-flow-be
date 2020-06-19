import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly icon?: string;

  @IsString({ groups: ['directory', 'item'] })
  @Expose()
  readonly type: 'directory' | 'item';

  @IsString()
  @Expose()
  readonly url: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly parentId?: string;
}
