import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  async log(data: any) {
    console.log(data);
  }
}
