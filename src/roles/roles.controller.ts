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
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';

import { ExcludeUndefinedPipe } from '../Pipes/excludeUndefined.pipe';
import {
  CreateRoleDto,
  DeleteRoleDto,
  QueryRoleDto,
  UpdateRoleDto,
} from './dto';
import { Role } from './role.schema';
import { RolesService } from './roles.service';

@UseGuards(JwtAuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseOperateLog('角色')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryRoleDto): Promise<Role[]> {
    return this.rolesService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role | undefined> {
    return this.rolesService.findOne(id);
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Post()
  async create(
    @Body()
    createRoleDto: CreateRoleDto,
    @User() user,
  ) {
    const organizationId = user.organizationId;
    await this.rolesService.create({ organizationId, ...createRoleDto });
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  async updateOne(@Body() updateRoleDto: UpdateRoleDto) {
    await this.rolesService.updateOne(updateRoleDto);
  }

  @Delete()
  async deleteOne(@Body() deleteRoleDto: DeleteRoleDto) {
    await this.rolesService.deleteOne(deleteRoleDto);
  }
}
