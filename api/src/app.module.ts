import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OpenIdController } from './openid.controller';
import { OpenIdService } from './openid.service';
import { HelloModule } from './hello';
import { AppConfigurationModule } from './app-configuration/app-configuration.module';
import { AppConfigurationService } from './app-configuration';
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
export class AppModule {}
