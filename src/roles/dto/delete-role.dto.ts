import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

export class DeleteRoleDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
