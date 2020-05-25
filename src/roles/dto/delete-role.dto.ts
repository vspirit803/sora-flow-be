import { Expose, Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class DeleteRoleDto {
  @Expose()
  @IsString()
  readonly id: string;
}
