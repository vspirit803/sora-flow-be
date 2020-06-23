import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { User } from 'src/Decorators/user.decorator';
import { QueryMenuDto } from 'src/menus/dto';

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
}
