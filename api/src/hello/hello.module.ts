import { Module } from '@nestjs/common';
import { HelloService } from './services/hello.service';
import { HelloController } from './controllers/hello.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HelloUser } from './models/hello-user.model';
import { HelloUsersService } from './services/hello-users.service';

@Module({
    imports: [SequelizeModule.forFeature([HelloUser])],
    controllers: [HelloController],
    providers: [HelloService, HelloUsersService],
})
export class HelloModule {}