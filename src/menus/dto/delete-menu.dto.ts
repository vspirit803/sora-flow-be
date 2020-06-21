import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteMenuDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
