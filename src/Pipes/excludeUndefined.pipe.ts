import { Injectable, PipeTransform } from '@nestjs/common';

type Dict = { [key: string]: any };

@Injectable()
export class ExcludeUndefinedPipe implements PipeTransform<Dict, Dict> {
  transform(value: Dict): Dict {
    const result: Dict = {};
    Object.entries(value)
      .filter(([, value]) => value !== undefined)
      .forEach(([key, value]) => {
        result[key] = value;
      });
    return result;
  }
}
