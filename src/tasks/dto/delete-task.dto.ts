import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteTaskDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
