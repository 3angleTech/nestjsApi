import {Controller, Get, Post, Put, Delete, HttpException, Req, BadRequestException} from '@nestjs/common';
import { AppService } from './app.service';
import { OpenIdService } from './openid.service'
import * as Collections from 'typescript-collections';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly openIdService: OpenIdService
  ) {}

  @Get('dummy')
  getAll(@Req() request): string {
    let desiredRoles: Collections.Set<string> = new Collections.Set<string>();
    desiredRoles.add("USER");

    // TODO: We need to replace this AOP, proxy or smth similar
    let accessToken;
    try {
      accessToken = request.headers["authorization"].split(" ")[1];
    } catch (e) {
      throw new BadRequestException("Authorization Bearer is invalid");
    }

    let roles: Collections.Set<string> = this.openIdService.extractRoles(accessToken);

    if (!this.openIdService.isAuthorized(desiredRoles, roles)) {
      throw new HttpException("Not Authorized", 403);
    }

    return this.appService.getAll();
  }

  @Post('dummy')
  create(): string {
    return this.appService.create();
  }

  @Put('dummy')
  update(): string {
    return this.appService.update();
  }

  @Delete('dummy')
  delete(@Req() request): string {
    let desiredRoles: Collections.Set<string> = new Collections.Set<string>();
    desiredRoles.add("ADMIN");

    // TODO: We need to replace this AOP, proxy or smth similar
    let accessToken;
    try {
      accessToken = request.headers["authorization"].split(" ")[1];
    } catch (e) {
      throw new BadRequestException("Authorization Bearer is invalid");
    }

    let roles: Collections.Set<string> = this.openIdService.extractRoles(accessToken);

    if (!this.openIdService.isAuthorized(desiredRoles, roles)) {
      throw new HttpException("Not Authorized", 403);
    }

    return this.appService.delete();
  }
}
