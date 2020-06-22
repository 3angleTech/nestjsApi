import { Module, Global } from '@nestjs/common';
import { AppConfigurationService } from './services/app-configuration.service';
import { ConfigModule } from '@nestjs/config';
import { configModuleOptions } from './config-module-options';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions())
  ],
  providers: [AppConfigurationService],
  exports: [AppConfigurationService],
})
export class AppConfigurationModule {}
