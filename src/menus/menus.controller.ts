import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LogOperateInterceptor } from 'src/Interceptors/log.operate.interceptor';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import {
  CreateMenuDto,
  DeleteMenuDto,
  QueryMenuDto,
  UpdateMenuDto,
} from './dto';
import { MenusService } from './menus.service';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async findAll(@Query() query: QueryMenuDto) {
    return this.menusService.findAll(query);
  }

  @Post()
  @UsePipes(ExcludeUndefinedPipe)
  @UseInterceptors(LogOperateInterceptor)
  @SetMetadata('operateName', '新增菜单')
  async create(
    @Body()
    createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(createMenuDto);
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  @UseInterceptors(LogOperateInterceptor)
  @SetMetadata('operateName', '修改菜单')
  async updateOne(@Body() updateMenuDto: UpdateMenuDto) {
    await this.menusService.updateOne(updateMenuDto);
  }

  @Delete()
  @UseInterceptors(LogOperateInterceptor)
  @SetMetadata('operateName', '删除菜单')
  async deleteOne(@Body() deleteMenuDto: DeleteMenuDto) {
    await this.menusService.deleteOne(deleteMenuDto);
  }
}
