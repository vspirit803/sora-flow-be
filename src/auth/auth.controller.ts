import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginOrganizationDto } from './dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: { excludeExtraneousValues: true },
  }),
)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('organization')
  /**获取指定公司的token */
  async organizationLogin(@Body() loginOrganizationDto: LoginOrganizationDto, @Req() req) {
    const auth = await this.authService.loginOrganization(req.user, loginOrganizationDto.organizationId);
    if (!auth) {
      throw new UnauthorizedException();
    }

    return auth;
  }
}
