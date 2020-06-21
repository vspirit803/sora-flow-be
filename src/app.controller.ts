import { Controller, Get, Request, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { OrganizationAuthGuard } from './auth/organization-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(OrganizationAuthGuard)
  @Get('profile/organization')
  getOrganizationProfile(@Request() req) {
    return req.user;
  }
}
