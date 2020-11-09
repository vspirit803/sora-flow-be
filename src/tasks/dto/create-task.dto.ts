import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTaskDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly account?: string;

  @Expose()
  readonly type: string;

  @Expose()
  readonly status: string;

  @Expose()
  /**截止时间 */
  finalTime: Date;

  @Expose()
  readonly metadata: Types.Map<any>;
}
