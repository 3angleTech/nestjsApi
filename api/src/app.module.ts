/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppConfigurationService } from './app-configuration';
import { AppConfigurationModule } from './app-configuration/app-configuration.module';
import { HelloModule } from './hello';
import { OpenIdController } from './openid.controller';
import { OpenIdService } from './openid.service';
import { sequelizeModuleFactory } from './sequelize.config';

@Module({
  imports: [
    AppConfigurationModule,
    SequelizeModule.forRootAsync({
      imports: [AppConfigurationModule],
      useFactory: sequelizeModuleFactory,
      inject: [AppConfigurationService],
    }),
    HelloModule,
  ],
  controllers: [OpenIdController],
  providers: [OpenIdService],
})
export class AppModule { }
