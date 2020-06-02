import {Injectable} from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as Collections from "typescript-collections";
import * as has from 'lodash/has';

const fetch = require('node-fetch');

@Injectable()
export class OpenIdService {
    clientId = '3at-nest-api'
    clientSecret = 'b8b62159-693a-4676-ac7d-8ebff41552a3'

    async exchangeCredentials(): Promise<any> {
        const encodedCredentials = Buffer.from(this.clientId + ":" + this.clientSecret).toString('base64');
        const params = {
            'grant_type': 'client_credentials',
            'scope': 'openid,email,profile,roles'
        };
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        // Default options are marked with *
        const response = await fetch('http://localhost:8180/auth/realms/master/protocol/openid-connect/token', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + encodedCredentials
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: searchParams // body data type must match "Content-Type" header
        });

        return response.json();
    }

    async accessTokenIsValid(accessToken: String): Promise<boolean> {
        // Default options are marked with *
        const response = await fetch('http://localhost:8180/auth/realms/master/protocol/openid-connect/userinfo', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        });

        return response.json();
    }

    async refreshTokens(refreshToken: String): Promise<any> {
        const params = {
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'refresh_token': refreshToken,
            'grant_type': 'refresh_token'
        };
        const searchParams = Object.keys(params).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
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
            body: searchParams
        });

        return response.json();
    }

    extractRoles(accessToken: string): Collections.Set<string> {
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

    isAuthorized(desiredRoles: Collections.Set<string>, roles: Collections.Set<string>): boolean {
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