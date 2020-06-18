import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateAccountDto {
  @IsString()
  @Expose()
  readonly id: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly name: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly password: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly roleId: string;
}
