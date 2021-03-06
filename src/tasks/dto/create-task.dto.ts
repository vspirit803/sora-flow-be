import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly account?: string;

  @IsString()
  @Expose()
  readonly type: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly status?: string;

  @Expose()
  /**截止时间 */
  finalTime: Date;

  @Expose()
  readonly metadata: Record<string, string>;
}
