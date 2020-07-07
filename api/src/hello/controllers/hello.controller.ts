/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import {Controller, Get, Put, Req, UnauthorizedException} from '@nestjs/common';

import { HelloUser } from '../models/hello-user.model';
import { HelloUsersService } from '../services/hello-users.service';
import { HelloService } from '../services/hello.service';
import { OpenIdService } from "../../openid.service";
import { Request } from 'express';

import * as Collections from "typescript-collections";

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService,
              private readonly helloUsersService: HelloUsersService,
              private readonly openIdService: OpenIdService) { }

  @Get()
  public getAll(): string {
    return this.helloService.getAll();
  }

  @Get('users')
  public async getAllHelloUsers(): Promise<HelloUser[]> {
    return this.helloUsersService.findAll();
  }

  @Put("/organizations/:orgId")
  public async updateOrg(@Req() request: Request): Promise<string> {
    // start Guard
    const accessToken : string = request.header("Authorization").split(" ")[1];
    const actualRoles : Collections.Set<string> = this.openIdService.extractRoles(accessToken);
    const desiredRoles : Collections.Set<string> = HelloController.getDesiredRolesToUpdateOrg(request.params.orgId);

    if (!this.openIdService.isAuthorized(desiredRoles, actualRoles)) {
      throw new UnauthorizedException();
    }
    // end Guard

    // start business logic
    return "ORG updated";
    // end business logic
  }

  private static getDesiredRolesToUpdateOrg(orgId: string): Collections.Set<string> {
    const result = new Collections.Set<string>();

    // get org from db based by ID and
    //  load desired organization roles from config/enum etc
    switch (orgId) {
      case "1": // TESLA
        result.add("SERVICE_OPS_TESLA");
        result.add("EditOrganization");
        break;
      case "2": // SPACEX
        result.add("SERVICE_OPS_SPACEX");
        result.add("EditOrganization");
        break;
    }

    return result;
  }
}
