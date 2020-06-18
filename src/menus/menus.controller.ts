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
import { OperateLogInterceptor } from 'src/Interceptors/operate-log.interceptor';
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
  @UseInterceptors(OperateLogInterceptor)
  @SetMetadata('operateTarget', '菜单')
  async create(
    @Body()
    createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(createMenuDto);
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  @UseInterceptors(OperateLogInterceptor)
  @SetMetadata('operateTarget', '菜单')
  async updateOne(@Body() updateMenuDto: UpdateMenuDto) {
    await this.menusService.updateOne(updateMenuDto);
  }

  @Delete()
  @UseInterceptors(OperateLogInterceptor)
  @SetMetadata('operateTarget', '菜单')
  async deleteOne(@Body() deleteMenuDto: DeleteMenuDto) {
    await this.menusService.deleteOne(deleteMenuDto);
  }
}
