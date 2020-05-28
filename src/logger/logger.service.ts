import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  async log(type: string, content: any) {
    console.log(`[${type}] `);
    console.log(content);
  }
}
