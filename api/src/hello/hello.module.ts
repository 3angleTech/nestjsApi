import { Module } from '@nestjs/common';
import { HelloService } from './services/hello.service';
import { HelloController } from './controllers/hello.controller';

@Module({
    controllers: [HelloController],
    providers: [HelloService],
})
export class HelloModule {}