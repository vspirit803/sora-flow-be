import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteDepartmentDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
