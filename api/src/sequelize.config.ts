/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Dialect } from 'sequelize/types';

import { AppConfigurationService, IPostgresDBConfiguration } from './app-configuration';

// tslint:disable-next-line: typedef
const getPostgresParams = (config: IPostgresDBConfiguration) => {
  return {
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    dialect: <Dialect>config.dialect,
  };
};

// tslint:disable-next-line: typedef
export const sequelizeModuleFactory = async (configService: AppConfigurationService) => ({
  ...getPostgresParams(configService.getPostgresDBConfiguration()),
  autoLoadModels: true,
  synchronize: true,
});
