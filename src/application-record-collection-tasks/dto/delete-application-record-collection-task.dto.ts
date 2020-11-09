import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteApplicationRecordCollectionTaskDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
