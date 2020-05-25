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
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}
  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryRoleDto): Promise<Role[]> {
    return this.rolesService.findAll(query);
  }

  @Post()
  async create(
    @Body()
    createRoleDto: CreateRoleDto,
  ) {
    await this.rolesService.create(createRoleDto);
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
