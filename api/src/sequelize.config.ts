/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';

import { AppConfigurationService, IPostgresDBConfiguration } from './app-configuration';

const getPostgresParams = (config: IPostgresDBConfiguration): SequelizeModuleOptions => {
  return {
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    dialect: <Dialect>config.dialect,
  };
};

export const sequelizeModuleFactory = async (configService: AppConfigurationService): Promise<SequelizeModuleOptions> => ({
  ...getPostgresParams(configService.getPostgresDBConfiguration()),
  autoLoadModels: true,
  synchronize: true,
});
