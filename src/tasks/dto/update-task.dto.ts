import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @IsMongoId()
  @Expose()
  readonly id: string;

  @IsOptional()
  @Expose()
  readonly status?: string;

  @IsOptional()
  @Expose()
  readonly metadata?: Record<string, unknown>;
}
