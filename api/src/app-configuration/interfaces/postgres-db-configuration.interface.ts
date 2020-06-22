/**
 * Defines postgres configuration information structure
 */
export interface PostgresDBConfiguration {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
}