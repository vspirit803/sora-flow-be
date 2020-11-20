import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    if (payload.exp < Date.now() / 1000) {
      throw new UnauthorizedException({ statusCode: 401, message: '登陆已失效' });
    }
    return {
      id: payload.sub,
      name: payload.name,
      nickname: payload.nickname,
    };
  }
}
