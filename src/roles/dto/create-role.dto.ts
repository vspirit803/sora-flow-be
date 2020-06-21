import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly text: string;

  @IsArray()
  @IsMongoId({
    each: true,
  })
  @Expose()
  readonly authorizedOperations: Array<string>;
}
