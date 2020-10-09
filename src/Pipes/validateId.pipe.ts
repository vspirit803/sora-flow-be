import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isMongoId } from 'class-validator';

@Injectable()
export class ValidateIdPipe implements PipeTransform {
  transform(value, metadata): any {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }
    if (isMongoId(value)) {
      return value;
    } else {
      throw new BadRequestException('id must be a mongodb id');
    }
  }
}
