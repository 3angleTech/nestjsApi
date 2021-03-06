/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { BadRequestException, Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import * as _ from 'lodash';

import { OpenIdService } from './openid.service';

@Controller('openid')
export class OpenIdController {
  constructor(private readonly openIdService: OpenIdService) { }

  @Get('access-token')
  @HttpCode(200)
  public async exchangeCredentials(): Promise<object> {
    const result = await this.openIdService.exchangeCredentials();

    return {
      access_token: result.access_token,
      expires_in: result.expires_in,
      refresh_token: result.refresh_token,
      refresh_expires_in: result.refresh_expires_in
    };
  }

  @Post('access-token-is-valid')
  @HttpCode(200)
  public async accessTokenIsValid(@Body() accessTokenReqDTO: any): Promise<boolean> {
    const result = await this.openIdService.accessTokenIsValid(accessTokenReqDTO.accessToken);
    if (_.has(result, 'error')) {
      throw new BadRequestException(result);
    }
    return true;
  }

  @Post('refresh-tokens')
  @HttpCode(200)
  public async refreshTokens(@Body() refreshTokenReqDTO: any): Promise<string> {
    const result = await this.openIdService.refreshTokens(refreshTokenReqDTO.refreshToken);
    if (_.has(result, 'error')) {
      throw new BadRequestException(result);
    }
    return result;
  }
}
