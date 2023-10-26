import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ForbiddenException } from './exceptions/forbidden.exception';
import { Cat, CatParam } from './interfaces/cats.interface';
import { CatsService } from './shared/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private service: CatsService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.service.findAll();
  }

  @Get(':name/:age')
  getDetail(@Param() { name, age }: CatParam): string {
    return `Name: ${name}, age ${age}`;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Put()
  async getForbidden() {
    throw new ForbiddenException();
  }

  @Patch()
  async getError() {
    try {
      throw new ForbiddenException();
    } catch (error) {
      throw new HttpException(
        {
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post()
  create(@Body() cat: Cat) {
    for (let count = 1; count <= 800000; count++) {
      this.service.create(cat);
    }
  }
}
