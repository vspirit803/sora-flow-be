import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteAccountDto {
  @Expose()
  @IsMongoId()
  readonly id: string;
}
