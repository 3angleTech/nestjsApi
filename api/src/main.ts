/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { NestFactory } from '@nestjs/core';

import { APP_CONFIGURATION_SERVICE_PROVIDER, AppConfigurationService } from './app-configuration';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config: AppConfigurationService = app.get(APP_CONFIGURATION_SERVICE_PROVIDER);
  await app.listen(config.getServerPort());
}
bootstrap();
