import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenIdController } from './openid.controller';
import { OpenIdService } from './openid.service';

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController, OpenIdController],
  providers: [AppService, OpenIdService],
})
export class AppModule {}
