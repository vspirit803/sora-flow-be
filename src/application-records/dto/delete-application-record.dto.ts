import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class DeleteApplicationRecordDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization: string;
}
