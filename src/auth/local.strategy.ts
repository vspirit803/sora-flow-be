import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoggerService } from 'src/logger/logger.service';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {
    super({ usernameField: 'name' });
  }

  async validate(name: string, password: string): Promise<any> {
    const user = await this.authService.validateAccount(name, password);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
