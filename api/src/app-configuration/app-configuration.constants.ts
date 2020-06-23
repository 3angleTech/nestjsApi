/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import * as Joi from '@hapi/joi';

const DEFAULT_SERVER_PORT = 3000;

export const SERVER_PORT = 'SERVER_PORT';

export const POSTGRES_USER = 'POSTGRES_USER';
export const POSTGRES_PASSWORD = 'POSTGRES_PASSWORD';
export const POSTGRES_DATABASE = 'POSTGRES_DATABASE';
export const POSTGRES_HOST = 'POSTGRES_HOST';
export const POSTGRES_PORT = 'POSTGRES_PORT';
export const POSTGRES_DIALECT = 'POSTGRES_DIALECT';

export const configModuleOptions = (): object => ({
  expandVariables: true,
  isGlobal: true,
  validationSchema: Joi.object({
    /**
     * Server port
     */
    SERVER_PORT: Joi.number().default(DEFAULT_SERVER_PORT),
    /**
     * Posgres DB configurations
     */
    POSTGRES_USER: Joi.string(),
    POSTGRES_PASSWORD: Joi.string().allow(''),
    POSTGRES_DATABASE: Joi.string(),
    POSTGRES_HOST: Joi.string(),
    POSTGRES_PORT: Joi.number(),
    POSTGRES_DIALECT: Joi.string(),
  }),
  validationOptions: {
    allowUnknown: true,
    abortEarly: true,
  },
});
