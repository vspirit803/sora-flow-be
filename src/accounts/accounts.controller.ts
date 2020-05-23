import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { CreateAccountDto,QueryAccountDto } from './dto';
import { AccountsService } from './accounts.service';
import { Account } from './account.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
