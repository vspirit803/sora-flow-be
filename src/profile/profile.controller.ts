import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { User } from 'src/Decorators/user.decorator';
import { QueryMenuDto } from 'src/menus/dto';
import { MenusService } from 'src/menus/menus.service';
import { transformToTree } from 'src/menus/transformToTree';
import { Role } from 'src/roles/role.schema';
import { RolesService } from 'src/roles/roles.service';

import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly menusService: MenusService,
    private readonly rolesService: RolesService,
  ) {}

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
}
