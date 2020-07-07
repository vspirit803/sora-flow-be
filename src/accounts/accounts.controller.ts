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
import { OrganizationAuthGuard } from 'src/auth/organization-auth.guard';
import { UseOperateLog } from 'src/Decorators/operate-log.decorator';
import { User } from 'src/Decorators/user.decorator';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExcludeUndefinedPipe } from '../Pipes/excludeUndefined.pipe';
import { Account } from './account.schema';
import { AccountsService } from './accounts.service';
import {
  CreateAccountDto,
  DeleteAccountDto,
  QueryAccountDto,
  UpdateAccountDto,
} from './dto';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@UseGuards(JwtAuthGuard)
@UseOperateLog('账号')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  @Get()
  @UsePipes(ExcludeUndefinedPipe)
  async findAll(@Query() query: QueryAccountDto): Promise<Account[]> {
    return this.accountsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Account | undefined> {
    return this.accountsService.findOne(id);
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Post()
  async create(
    @Body()
    createAccountDto: CreateAccountDto,
    @User() user,
  ) {
    const organizationId = user.organizationId;
    await this.accountsService.create({ organizationId, ...createAccountDto });
  }

  @UseGuards(OrganizationAuthGuard)
  @UsePipes(ExcludeUndefinedPipe)
  @Patch()
  async updateOne(@Body() updateAccountDto: UpdateAccountDto, @User() user) {
    const organizationId = user.organizationId;
    await this.accountsService.updateOne(updateAccountDto, organizationId);
  }

  @Delete()
  async deleteOne(@Body() deleteAccountDto: DeleteAccountDto) {
    await this.accountsService.deleteOne(deleteAccountDto);
  }
}
