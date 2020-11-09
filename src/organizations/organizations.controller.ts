import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import { CreateOrganizationDto, DeleteOrganizationDto, QueryOrganizationDto, UpdateOrganizationDto } from './dto';
import { OrganizationsService } from './organizations.service';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('组织')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryOrganizationDto) {
    return this.organizationsService.findAll(query);
  }

  @Post()
  @UsePipes(ExcludeUndefinedPipe)
  async create(
    @Body()
    createOrganizationDto: CreateOrganizationDto,
    @Req() request,
  ) {
    const supervisorId = request.user.id;
    await this.organizationsService.create({
      supervisorId,
      ...createOrganizationDto,
    });
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  async updateOne(@Body() updateOrganizationDto: UpdateOrganizationDto) {
    await this.organizationsService.updateOne(updateOrganizationDto);
  }

  @Delete()
  async deleteOne(@Body() deleteOrganizationDto: DeleteOrganizationDto) {
    await this.organizationsService.deleteOne(deleteOrganizationDto);
  }
}
