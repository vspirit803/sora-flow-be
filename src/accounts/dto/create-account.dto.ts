import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly password: string;
}
