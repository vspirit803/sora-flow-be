import { IsString, IsOptional } from 'class-validator';

export class QueryAccountDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
