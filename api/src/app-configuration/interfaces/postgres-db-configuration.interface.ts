/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
export interface IPostgresDBConfiguration {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
}
