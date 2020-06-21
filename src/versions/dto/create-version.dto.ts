import { Expose } from 'class-transformer';
import { IsArray, IsMongoId, IsString } from 'class-validator';

export class CreateVersionDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsArray()
  @IsMongoId({
    each: true,
  })
  @Expose()
  readonly authorizedOperations: Array<string>;
}
