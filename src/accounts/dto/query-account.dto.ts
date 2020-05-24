import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryAccountDto {
  @Expose()
  @IsOptional()
  @IsString()
  readonly name: string;
}
