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
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import { DepartmentsService } from './departments.service';
import {
  CreateDepartmentDto,
  DeleteDepartmentDto,
  QueryDepartmentDto,
  UpdateDepartmentDto,
} from './dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('部门')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  @UseGuards(OrganizationAuthGuard)
  async findAll(@Query() query: QueryDepartmentDto, @User() user) {
    const organization = user.organizationId;
    return this.departmentsService.findDepartments({ organization, ...query });
  }

  @Post()
  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  async create(
    @Body()
    createDepartmentDto: CreateDepartmentDto,
    @User() user,
  ) {
    const organization = user.organizationId;

    return this.departmentsService.create({
      organization,
      ...createDepartmentDto,
    });
  }

  @Patch()
  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  async updateOne(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentsService.updateOne(updateDepartmentDto);
  }

  @Delete()
  @UseGuards(OrganizationAuthGuard)
  async deleteOne(@Body() deleteDepartmentDto: DeleteDepartmentDto) {
    await this.departmentsService.deleteOne(deleteDepartmentDto);
  }
}
