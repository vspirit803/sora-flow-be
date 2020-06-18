import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OperateLogInterceptor } from 'src/Interceptors/operate-log.interceptor';

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

  @Post()
  @SetMetadata('operateTarget', '账号')
  @UseInterceptors(OperateLogInterceptor)
  async create(
    @Body()
    createAccountDto: CreateAccountDto,
  ) {
    await this.accountsService.create(createAccountDto);
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  @SetMetadata('operateTarget', '账号')
  @UseInterceptors(OperateLogInterceptor)
  async updateOne(@Body() updateAccountDto: UpdateAccountDto) {
    await this.accountsService.updateOne(updateAccountDto);
  }

  @Delete()
  @SetMetadata('operateTarget', '账号')
  @UseInterceptors(OperateLogInterceptor)
  async deleteOne(@Body() deleteAccountDto: DeleteAccountDto) {
    await this.accountsService.deleteOne(deleteAccountDto);
  }
}
