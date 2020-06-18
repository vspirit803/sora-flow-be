import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteRoleDto {
  @IsString()
  @Expose()
  readonly id: string;
}
