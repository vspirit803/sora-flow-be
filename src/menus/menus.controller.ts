import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoggingInterceptor } from 'src/Interceptors/logging.interceptor';
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

  @UseInterceptors(LoggingInterceptor)
  @Get()
  async findAll(@Query() query: QueryMenuDto) {
    return this.menusService.findAll(query);
  }

  @Post()
  @UsePipes(ExcludeUndefinedPipe)
  async create(
    @Body()
    createMenuDto: CreateMenuDto,
  ) {
    return this.menusService.create(createMenuDto);
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  async updateOne(@Body() updateMenuDto: UpdateMenuDto) {
    await this.menusService.updateOne(updateMenuDto);
  }

  @Delete()
  async deleteOne(@Body() deleteMenuDto: DeleteMenuDto) {
    await this.menusService.deleteOne(deleteMenuDto);
  }
}
