import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

export class CreateAccountDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose({ toClassOnly: true })
  readonly password: string;
}
