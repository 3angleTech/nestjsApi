import { PostgresDBConfiguration, AppConfigurationService } from "./app-configuration";
import { Dialect } from "sequelize/types";

const getPostgresParams = (config: PostgresDBConfiguration) => {
    return {
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        dialect: <Dialect>config.dialect,
    };
}

export const sequelizeModuleFactory = async (configService: AppConfigurationService) => ({
    ...getPostgresParams(configService.getPostgresDBConfiguration()),
    autoLoadModels: true,
    synchronize: true,
})
