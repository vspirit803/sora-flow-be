import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Account } from './account.schema';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, QueryAccountDto } from './dto';

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
  async findAll(@Query() query: QueryAccountDto): Promise<Account[]> {
    return this.accountsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Account | undefined> {
    return this.accountsService.findOne(id);
  }

  @Post()
  async create(
    @Body()
    createAccountDto: CreateAccountDto,
  ) {
    // console.log(createAccountDto);
    await this.accountsService.create(createAccountDto);
  }

  async findOneByName(
    @Param('name') name: string,
  ): Promise<Account | undefined> {
    return this.accountsService.findOneByName(name);
  }
}
