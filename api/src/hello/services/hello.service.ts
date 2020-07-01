/**
 * @license
 * Copyright (c) 2019 THREEANGLE SOFTWARE SOLUTIONS SRL
 * Available under MIT license
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
    constructor() { }

    public getAll(): string {
        return 'getAll hello API';
    }
}
