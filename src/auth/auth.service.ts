import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountsService } from 'src/accounts/accounts.service';
import { Organization } from 'src/organizations/organization.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(name: string, password: string): Promise<any> {
    // 管理员账号特殊处理
    if (name === 'admin' && password === '12345678!@#$%^&*') {
      return { name: 'admin', nickname: '金闪闪管理员' };
    }

    const user = await this.accountsService.findOneByNamePassword(
      name,
      password,
    );
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      name: user.name,
      nickname: user.nickname,
      sub: user.id,
      roleId: user.roleId,
      roleName: user.roleName,
    };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginOrganization(jwtAccount: any, organizationId: string) {
    const { id } = jwtAccount;
    const account = await this.accountsService.findOne(id);
    account.organizations as Array<Organization>;
    const organization = (account.organizations as Array<Organization>).find(
      (each) => each.id === organizationId,
    );
    if (!organization) {
      return null;
    }
    const payload = {
      name: account.name,
      nickname: account.nickname,
      sub: account.id,
      roleId: account.roleId,
      roleName: account.roleName,
      organizationId,
      organizationName: organization.name,
    };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
