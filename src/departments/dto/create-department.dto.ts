import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @Expose()
  readonly name: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsMongoId()
  @Expose()
  readonly supervisor: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly parentId?: string;
}
