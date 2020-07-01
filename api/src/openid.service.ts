/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Injectable } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as Collections from "typescript-collections";
// @ts-ignore
import * as has from 'lodash/has';

const fetch = require('node-fetch');

@Injectable()
export class OpenIdService {
  private readonly CLIENT_ID: string = '3at-nest-api';
  private readonly CLIENT_SECRET: string = 'd0e45e07-cf11-48ff-a6f8-87a2060d6055';

  async exchangeCredentials(): Promise<any> {
    const encodedCredentials = Buffer.from(`${this.CLIENT_ID}:${this.CLIENT_SECRET}`).toString('base64');
    const params = {
      grant_type: 'client_credentials',
      scope: 'openid,email,profile,roles',
    };
    const searchParams = Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');

    // Default options are marked with *
    const response = await fetch('http://localhost:8180/auth/realms/master/protocol/openid-connect/token', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedCredentials}`,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: searchParams, // body data type must match "Content-Type" header
    });

    return response.json();
  }

  public async accessTokenIsValid(accessToken: string): Promise<boolean> {
    // Default options are marked with *
    const response = await fetch('http://localhost:8180/auth/realms/master/protocol/openid-connect/userinfo', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    return response.json();
  }

  public async refreshTokens(refreshToken: string): Promise<string> {
    const params = {
      client_id: this.CLIENT_ID,
      client_secret: this.CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    };
    const searchParams = Object.keys(params).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    }).join('&');

    // Default options are marked with *
    const response = await fetch('http://localhost:8180/auth/realms/master/protocol/openid-connect/token', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: searchParams,
    });

    return response.json();
  }


  public extractRoles(accessToken: string): Collections.Set<string> {
    const decodedJwt = jwt.decode(accessToken);
    let roles: Collections.Set<string> = new Collections.Set<string>();
    // @ts-ignore
    const { realm_access } = decodedJwt;

    if (has(realm_access, 'roles')) {
        // @ts-ignore
        realm_access.roles.concat(decodedJwt.resource_access[this.clientId].roles).forEach(tmp => {
            roles.add(tmp);
        });
    } else {
        // @ts-ignore
        decodedJwt.resource_access[this.clientId].roles.forEach(tmp => {
            roles.add(tmp);
        });
    }

    return roles;
  }

  public isAuthorized(desiredRoles: Collections.Set<string>, roles: Collections.Set<string>): boolean {
    let result = true;
    desiredRoles.forEach(role => {
        if (!roles.contains(role)) {
            result = false;
            return;
        }
    })

    return result;
  }
}
