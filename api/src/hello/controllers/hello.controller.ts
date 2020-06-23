import { Controller, Get } from '@nestjs/common';
import { HelloService } from '../services/hello.service';
import { HelloUsersService } from '../services/hello-users.service';
import { HelloUser } from '../models/hello-user.model';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService: HelloService, private readonly helloUsersService: HelloUsersService) {}

    @Get()
    getAll(): string {
        return this.helloService.getAll();
    }

    @Get('users')
    async getAllHelloUsers(): Promise<HelloUser[]> {
        return this.helloUsersService.findAll();
    }
}
