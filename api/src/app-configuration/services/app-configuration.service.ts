import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresDBConfiguration } from '../interfaces/postgres-db-configuration.interface';

@Injectable()
export class AppConfigurationService {
    constructor(private configService: ConfigService) {}
    
    public getPostgresDBConfiguration(): PostgresDBConfiguration {
        return {
            username: this.configService.get('POSTGRES_USER'),
            password: this.configService.get('POSTGRES_PASSWORD'),
            database: this.configService.get('POSTGRES_DATABASE'),
            host: this.configService.get('POSTGRES_HOST'),
            port: this.configService.get('POSTGRES_PORT'),
            dialect: this.configService.get('POSTGRES_DIALECT'),
        }
    }
}
