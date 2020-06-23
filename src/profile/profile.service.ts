import { Injectable } from '@nestjs/common';
import { QueryMenuDto } from 'src/menus/dto';
import { MenusService } from 'src/menus/menus.service';
import { transformToTree } from 'src/menus/transformToTree';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class ProfileService {
  constructor(
    private readonly menusService: MenusService,
    private readonly rolesService: RolesService,
  ) {}

  async getMenus(query: QueryMenuDto, roleList: Array<string>) {
    const roles = await this.rolesService.findByRoles(roleList); //该用户的角色
    const menus = await this.menusService.findAll({ ...query, enable: true }); //满足筛选的菜单
    //授权菜单id集合
    const authorizedOperationSet = new Set<string>();
    roles
      .map((each) => each.authorizedOperations)
      .forEach((each) => {
        each.forEach((eachOperation) => {
          authorizedOperationSet.add(eachOperation);
        });
      });

    //授权菜单项
    const authorizedMenuItems = menus.filter((eachMenu) =>
      authorizedOperationSet.has(eachMenu.id),
    );
    //授权菜单集合
    const authorizedMenuSet = new Set<string>();
    authorizedMenuItems.forEach((eachMenuItem) => {
      authorizedMenuSet.add(eachMenuItem.id);
      eachMenuItem.idPath.forEach((each) => {
        authorizedMenuSet.add(each);
      });
    });
    //授权的菜单
    const authorizedMenu = menus.filter((eachMenu) => {
      return authorizedMenuSet.has(eachMenu.id);
    });

    return transformToTree(authorizedMenu);
  }
}
