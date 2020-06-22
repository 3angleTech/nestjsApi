import Joi = require("@hapi/joi");

export const configModuleOptions = () => ({
  expandVariables: true,
  isGlobal: true,
  validationSchema: Joi.object({
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