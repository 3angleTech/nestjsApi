/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configModuleOptions } from './app-configuration.constants';
import { AppConfigurationService } from './services/app-configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions()),
  ],
  providers: [AppConfigurationService],
  exports: [AppConfigurationService],
})
export class AppConfigurationModule { }
