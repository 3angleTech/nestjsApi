import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAll(): string {
    return 'getAll dummy API';
  }
  create(): string {
    return 'create dummy API';
  }
  update(): string {
    return 'update dummy API';
  }
  delete(): string {
    return 'delete dummy API';
  }
}
