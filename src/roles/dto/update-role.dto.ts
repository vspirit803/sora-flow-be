import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
  @Expose()
  @IsString()
  readonly id: string;
}
