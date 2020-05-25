import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
  @Expose()
  @IsString()
  readonly id: string;
}
