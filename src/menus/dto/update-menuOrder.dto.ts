import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsOptional } from 'class-validator';

export class UpdateMenuOrderDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({
    each: true,
  })
  @Expose()
  readonly menus?: Array<string>;
}
