import { Expose } from 'class-transformer';
import { IsArray, IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateApplicationRecordCollectionTaskDto {
  @IsOptional()
  @IsMongoId()
  @Expose()
  readonly organization?: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly publisher?: string;

  @IsString()
  @Expose()
  readonly application: string;

  @IsOptional()
  @IsString()
  @Expose()
  readonly status: string;

  @IsDateString()
  @Expose()
  readonly finalTime: Date;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  @Expose()
  /**填表人 */
  readonly reporters?: Array<string>;
}
