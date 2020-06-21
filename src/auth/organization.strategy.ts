import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConstants } from './constants';

@Injectable()
export class OrganizationStrategy extends PassportStrategy(
  Strategy,
  'organization',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const { organizationId, organizationName } = payload;
    if (!organizationId || !organizationName) {
      throw new UnauthorizedException();
    }
    return {
      id: payload.sub,
      name: payload.name,
      nickname: payload.nickname,
      roleId: payload.roleId,
      roleName: payload.roleName,
      organizationId: payload.organizationId,
      organizationName: payload.organizationName,
    };
  }
}
