import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class DeleteRoleDto {
  @Expose()
  @IsString()
  readonly id: string;
}
