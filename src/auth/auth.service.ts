import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly accountsService: AccountsService,private readonly jwtService: JwtService) {}

  async validateAccount(name: string, pass: string): Promise<any> {
    const user = await this.accountsService.findOneByName(name);
    if (user && user.password === pass) {
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
