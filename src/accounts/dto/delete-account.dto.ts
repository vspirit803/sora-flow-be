import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteAccountDto {
  @Expose()
  @IsString()
  readonly id: string;
}
