import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../services/hello.service';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService: HelloService) {}

    @Get()
    getAll(): string {
        return this.helloService.getAll();
    }
}
