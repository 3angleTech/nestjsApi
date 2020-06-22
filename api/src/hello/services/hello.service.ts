import { Injectable } from '@nestjs/common';
import { AppConfigurationService, PostgresDBConfiguration } from 'src/app-configuration';

@Injectable()
export class HelloService {
    constructor(private readonly appConfigurationService: AppConfigurationService) { }

    getAll(): string {
        let dbConfig: PostgresDBConfiguration = this.appConfigurationService.getPostgresDBConfiguration();
        console.log(JSON.stringify(dbConfig));
        
        return 'getAll hello API';
    }
}
