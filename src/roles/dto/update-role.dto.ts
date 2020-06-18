import { Expose } from 'class-transformer';
import { IsMongoId } from 'class-validator';

import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends CreateRoleDto {
  @IsMongoId()
  @Expose()
  readonly id: string;
}
