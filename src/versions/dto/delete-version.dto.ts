import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteVersionDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
