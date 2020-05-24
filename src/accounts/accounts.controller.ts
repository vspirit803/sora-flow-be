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

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExcludeUndefinedPipe } from '../Pipes/excludeUndefined.pipe';
import { Account } from './account.schema';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, QueryAccountDto } from './dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { PatchAccountDto } from './dto/patch-account.dto';

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
  async create(
    @Body()
    createAccountDto: CreateAccountDto,
  ) {
    await this.accountsService.create(createAccountDto);
  }

  @Patch()
  @UsePipes(ExcludeUndefinedPipe)
  async updateOne(@Body() patchAccountDto: PatchAccountDto) {
    await this.accountsService.updateOne(patchAccountDto);
  }

  @Delete()
  async deleteOne(@Body() deleteAccountDto: DeleteAccountDto) {
    await this.accountsService.deleteOne(deleteAccountDto);
  }
}
