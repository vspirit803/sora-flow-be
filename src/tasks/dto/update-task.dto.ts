import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateTaskDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly account?: string;

  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @Expose()
  readonly status?: string;

  @IsOptional()
  @Expose()
  readonly metadata?: Types.Map<any>;
}
