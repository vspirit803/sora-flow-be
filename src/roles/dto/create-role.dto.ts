import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly text: string;
}
