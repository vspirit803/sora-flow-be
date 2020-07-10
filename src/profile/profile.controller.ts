import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { QueryAccountDto, UpdateAccountDto } from 'src/accounts/dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { User } from 'src/Decorators/user.decorator';
import { QueryMenuDto } from 'src/menus/dto';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';
import { QueryRoleDto } from 'src/roles/dto';

import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  /**个人信息 */
  getProfile(@User() user) {
    return user;
  }

  @UseGuards(OrganizationAuthGuard)
  @Get('organization')
  /**带组织信息的个人信息 */
  getOrganizationProfile(@User() user) {
    return user;
  }

  @UseGuards(OrganizationAuthGuard)
  @Get('menus')
  /**根据组织信息获取菜单 */
  async getMenus(@Query() query: QueryMenuDto, @User() user) {
    const roleList: Array<string> = user.roles.map((each) => each.id); //该用户的角色id
    return this.profileService.getMenus(query, roleList);
  }

  @UseGuards(JwtAuthGuard)
  @Get('organizations')
  /**组织列表 */
  getOrganizations(@User() user) {
    return this.profileService.getOrganizations(user.id);
  }

  @UseGuards(OrganizationAuthGuard)
  @Delete('organizations')
  /**离开组织 */
  leaveOrganization(@User() user, @Body() body: { accountId?: string }) {
    return this.profileService.leaveOrganization(
      body.accountId ?? user.id,
      user.organizationId,
    );
  }

  @UseGuards(OrganizationAuthGuard)
  @Get('roles')
  /**根据组织信息获取角色列表 */
  async getRoles(@Query() query: QueryRoleDto, @User() user) {
    const organizationId = user.organizationId;
    return this.profileService.getRoles(query, organizationId);
  }

  @UseGuards(OrganizationAuthGuard)
  @Get('accounts')
  /**根据组织信息获取账号列表 */
  async getAccounts(@Query() query: QueryAccountDto, @User() user) {
    const organizationId = user.organizationId;
    return this.profileService.getAccounts(query, organizationId);
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Patch('accounts')
  async updateAccount(
    @Body() updateAccountDto: UpdateAccountDto,
    @User() user,
  ) {
    const organizationId = user.organizationId;
    await this.profileService.updateAccount(updateAccountDto, organizationId);
  }
}
