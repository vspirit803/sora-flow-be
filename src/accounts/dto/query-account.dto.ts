import { IsOptional, IsString } from 'class-validator';

export class QueryAccountDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
