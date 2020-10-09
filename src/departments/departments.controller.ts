import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import {
  UseOperateLog,
  UseOperateLogMethod,
} from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';
import { ValidateIdPipe } from 'src/Pipes/validateId.pipe';

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
    console.log(createDepartmentDto);

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

  @UseGuards(OrganizationAuthGuard)
  @Get(':id')
  @UsePipes(ValidateIdPipe)
  async findOne(@Param('id') id: string) {
    return this.departmentsService.findOne(id);
  }

  @UseOperateLogMethod('部门成员')
  @UseGuards(OrganizationAuthGuard)
  @Get(':id/members')
  @UsePipes(ValidateIdPipe)
  async findMembers(@Param('id') id: string) {
    return this.departmentsService.findMembers(id);
  }

  @UseOperateLogMethod('部门成员')
  @UseGuards(OrganizationAuthGuard)
  @Post(':id/members')
  @UsePipes(ValidateIdPipe)
  async addMember(
    @Param('id') id: string,
    @Body() { members }: { members: Array<string> },
  ) {
    return this.departmentsService.addMembers(id, members);
  }

  @UseOperateLogMethod('部门成员')
  @UseGuards(OrganizationAuthGuard)
  @Delete(':id/members/:member')
  @UsePipes(ValidateIdPipe)
  async removeMember(@Param('id') id: string, @Param('member') member: string) {
    return this.departmentsService.removeMember(id, member);
  }
}
