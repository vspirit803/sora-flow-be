import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryVersionDto {
  @IsOptional()
  @Expose()
  @IsString()
  readonly name?: string;
}
