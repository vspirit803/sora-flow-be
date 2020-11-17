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
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';
import { ValidateIdPipe } from 'src/Pipes/validateId.pipe';

import { ApplicationStatus } from './application.schema';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto, DeleteApplicationDto, QueryApplicationDto, UpdateApplicationDto } from './dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('应用')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryApplicationDto, @User() user) {
    return this.applicationsService.findAll({
      organization: user.organizationId as string,
      ...query,
    });
  }

  @Get(':id')
  @UsePipes(ValidateIdPipe)
  async findOne(@Param('id') id: string) {
    return this.applicationsService.findOne(id);
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Post()
  async create(
    @Body()
    createApplicationDto: CreateApplicationDto,
    @User() user,
  ) {
    await this.applicationsService.create({
      name: '未命名应用',
      organization: user.organizationId as string,
      creator: user.id as string,
      status: 'Designing',
      formModel: [],
      ...createApplicationDto,
    });
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Patch()
  async updateOne(@Body() updateApplicationDto: UpdateApplicationDto, @User() user) {
    await this.applicationsService.updateOne({
      lastModifier: user.id,
      ...updateApplicationDto,
    });
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Delete()
  async deleteOne(@Body() deleteApplicationDto: DeleteApplicationDto, @User() user) {
    await this.applicationsService.deleteOne({
      organization: user.organizationId as string,
      ...deleteApplicationDto,
    });
  }
}
