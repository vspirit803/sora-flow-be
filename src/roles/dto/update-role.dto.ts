import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
  @IsString()
  @Expose()
  readonly id: string;
}
