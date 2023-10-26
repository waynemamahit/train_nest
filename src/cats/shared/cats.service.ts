import { Injectable } from '@nestjs/common';
import { Cat } from '../interfaces/cats.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    cat.id = this.cats.length + 1;
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  async findOne(id: number) {
    return this.cats.find((cat: Cat) => cat.id === id) || null;
  }
}
