/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Injectable } from '@nestjs/common';
import { AppConfigurationService, IPostgresDBConfiguration } from 'src/app-configuration';

@Injectable()
export class HelloService {
    constructor(private readonly appConfigurationService: AppConfigurationService) { }

    public getAll(): string {
        const dbConfig: IPostgresDBConfiguration = this.appConfigurationService.getPostgresDBConfiguration();
        // tslint:disable-next-line: no-console
        console.log(JSON.stringify(dbConfig));

        return 'getAll hello API';
    }
}
