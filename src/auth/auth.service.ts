import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(name: string, pass: string): Promise<any> {
    // 管理员账号特殊处理
    if (name === 'admin' && pass === '12345678!@#$%^&*') {
      return { name: 'admin' };
    }

    const user = await this.accountsService.findOneByName(name);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user._id };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
