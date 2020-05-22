import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('dummy')
  getAll(): string {
    return this.appService.getAll();
  }

  @Post('dummy')
  create(): string {
    return this.appService.create();
  }

  @Put('dummy')
  update(): string {
    return this.appService.update();
  }

  @Delete('dummy')
  delete(): string {
    return this.appService.delete();
  }
}
