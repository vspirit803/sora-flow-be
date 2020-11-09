import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateApplicationRecordCollectionTaskDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @Expose()
  readonly status?: string;
}
