import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class QueryMenuDto {
  @IsOptional()
  @Expose()
  @IsMongoId()
  readonly id: string;

  @IsOptional()
  @Expose()
  @IsString()
  readonly name: string;
}
