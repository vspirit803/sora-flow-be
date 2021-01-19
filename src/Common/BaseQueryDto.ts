import { Expose, Transform } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'textOptions', async: false })
export class TextOptions implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return args.constraints.includes(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `Text ($value) must one of [${args.constraints}]!`;
  }
}

class Sort {
  /**
   * 排序关键字
   */
  @IsString()
  @Expose()
  key: string;

  /**
   * 顺序
   * ASC 升序
   * DESC 降序
   */
  @IsString()
  @Validate(TextOptions, ['ASC', 'DESC'])
  @Expose()
  order: string;
}

class Pagination {
  /**
   * 页码 从1开始
   */
  @IsNumber()
  @Expose()
  page: number;

  /**
   * 分页大小
   */
  @IsNumber()
  @Min(10)
  @Expose()
  size: number;
}

export class BaseQueryDto {
  /**排序 */
  @IsOptional()
  @ValidateNested()
  @Expose()
  @Transform(({ value }) => {
    let key = 'createdAt',
      order = 'DESC';
    try {
      const { key: realKey = 'createdAt', order: realOrder = 'DESC' } = JSON.parse(value);
      key = realKey;
      order = realOrder;
    } catch (error) {}
    const sort = new Sort();
    sort.key = key;
    sort.order = order;
    return sort;
  })
  sort: Sort;

  /**分页 */
  @IsOptional()
  @ValidateNested()
  @Expose()
  @Transform(({ value }) => {
    let page = 1,
      size = 20;
    try {
      const { page: realPage = 1, size: realSize = 20 } = JSON.parse(value);
      page = realPage;
      size = realSize;
    } catch (error) {}
    const pagination = new Pagination();
    pagination.page = page;
    pagination.size = size;
    return pagination;
  })
  pagination: Pagination;
}
