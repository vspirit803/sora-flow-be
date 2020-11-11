import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';
import { ExcludeUndefinedPipe } from 'src/Pipes/excludeUndefined.pipe';

import { CreateTaskDto, DeleteTaskDto, QueryTaskDto, UpdateTaskDto } from './dto';
import { TasksService } from './tasks.service';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('待办任务')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryTaskDto, @User() user) {
    return this.tasksService.find({
      account: user.id,
      organization: user.organizationId,
      ...query,
    });
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Post()
  async create(
    @Body()
    createTaskDto: CreateTaskDto,
    @User() user,
  ) {
    await this.tasksService.create({
      account: user.id,
      organization: user.organizationId,
      status: 'processing',
      ...createTaskDto,
    });
  }

  @UsePipes(ExcludeUndefinedPipe)
  @Patch()
  async updateOne(@Body() updateTaskDto: UpdateTaskDto) {
    await this.tasksService.updateOne(updateTaskDto);
  }

  @Delete()
  async deleteOne(@Body() deleteTaskDto: DeleteTaskDto) {
    await this.tasksService.deleteOne(deleteTaskDto);
  }
}
