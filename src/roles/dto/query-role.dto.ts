import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryRoleDto {
  @IsOptional()
  @Expose()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @Expose()
  @IsString()
  readonly text?: string;
}
