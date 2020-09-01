import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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

import { ApplicationRecordsService } from './application-records.service';
import {
  CreateApplicationRecordDto,
  DeleteApplicationRecordDto,
  QueryApplicationRecordDto,
  UpdateApplicationRecordDto,
} from './dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('应用记录')
@Controller('applications/:applicationId/records')
export class ApplicationRecordsController {
  constructor(
    private readonly applicationRecordsService: ApplicationRecordsService,
  ) {}

  @Get()
  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(
    @Query() query: QueryApplicationRecordDto,
    @User() user,
    @Param() params: { applicationId: string },
  ) {
    return this.applicationRecordsService.findAll({
      application: params.applicationId,
      account: user.id,
      organization: user.organizationId,
      ...query,
    });
  }

  // @Get(':id')
  // @UsePipes(ValidateIdPipe)
  // async findOne(@Param('id') id: string) {
  //   return this.applicationRecordsService.findOne(id);
  // }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Post()
  async create(
    @Body()
    createApplicationRecordDto: CreateApplicationRecordDto,
    @User() user,
    @Param() params: { applicationId: string },
  ) {
    const createdApplicationRecord = await this.applicationRecordsService.create(
      {
        application: params.applicationId,
        account: user.id,
        organization: user.organizationId,
        ...createApplicationRecordDto,
      },
    );
  }

  // @UseGuards(OrganizationAuthGuard)
  // @UsePipes(ExcludeUndefinedPipe)
  // @Patch()
  // async updateOne(
  //   @Body() updateApplicationRecordDto: UpdateApplicationRecordDto,
  //   @User() user,
  // ) {
  //   await this.applicationRecordsService.updateOne({
  //     lastModifier: user.id,
  //     ...updateApplicationRecordDto,
  //   });
  // }

  // @UseGuards(OrganizationAuthGuard)
  // @UsePipes(ExcludeUndefinedPipe)
  // @Delete()
  // async deleteOne(
  //   @Body() deleteApplicationRecordDto: DeleteApplicationRecordDto,
  //   @User() user,
  // ) {
  //   await this.applicationRecordsService.deleteOne({
  //     organization: user.organizationId as string,
  //     ...deleteApplicationRecordDto,
  //   });
  // }
}
