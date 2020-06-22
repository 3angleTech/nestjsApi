import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OpenIdController } from './openid.controller';
import { OpenIdService } from './openid.service';
import { HelloModule } from './hello';
import { AppConfigurationModule } from './app-configuration/app-configuration.module';
import { AppConfigurationService } from './app-configuration';
import { Dialect } from 'sequelize/types';

@Module({
  imports: [
    AppConfigurationModule,
    SequelizeModule.forRootAsync({
      imports: [AppConfigurationModule],
      useFactory: async (configService: AppConfigurationService) => ({
        host: configService.getPostgresDBConfiguration().host,
        port: configService.getPostgresDBConfiguration().port,
        username: configService.getPostgresDBConfiguration().username,
        password: configService.getPostgresDBConfiguration().password,
        database: configService.getPostgresDBConfiguration().database,
        dialect: <Dialect>configService.getPostgresDBConfiguration().dialect,
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [AppConfigurationService],
    }),
    HelloModule,
  ],
  controllers: [OpenIdController],
  providers: [OpenIdService],
})
export class AppModule {}
