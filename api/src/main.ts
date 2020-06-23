/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { NestFactory } from '@nestjs/core';

import { AppConfigurationService } from './app-configuration';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config: AppConfigurationService = app.get('AppConfigurationService');
  await app.listen(config.getPort());
}
bootstrap();
