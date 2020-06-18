import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
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
  @UseOperateLog('菜单')
  async create(
    @Body()
    createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(createMenuDto);
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  @UseOperateLog('菜单')
  async updateOne(@Body() updateMenuDto: UpdateMenuDto) {
    await this.menusService.updateOne(updateMenuDto);
  }

  @Delete()
  @UseOperateLog('菜单')
  async deleteOne(@Body() deleteMenuDto: DeleteMenuDto) {
    await this.menusService.deleteOne(deleteMenuDto);
  }
}
