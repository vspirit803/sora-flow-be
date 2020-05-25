import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @Expose()
  @IsString()
  readonly id: string;

  @IsOptional()
  @Expose()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly password: string;
}
