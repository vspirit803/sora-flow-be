import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryAccountDto {
  @IsOptional()
  @Expose()
  @IsString()
  readonly name: string;
}
