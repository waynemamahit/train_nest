import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  TodoCreateDto,
  TodoUpdateDto,
  todoCreateSchema,
  todoUpdateSchema,
} from '../dto/todo.dto';
import { Todo, TodoQuery } from '../interfaces/todo.interface';
import { ApiResponse } from '../models/ApiResponse';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { TodoService } from './shared/todo.service';

@Controller('todo')
export class TodoController {
  constructor(private service: TodoService) {}

  @Get()
  getTodos(@Query() query: TodoQuery) {
    return new ApiResponse<Todo[]>({
      message: 'Successfully get data!',
      data: this.service.getTodos(query),
    });
  }

  @Post()
  @UsePipes(new ZodValidationPipe(todoCreateSchema))
  addTodo(@Body() body: TodoCreateDto) {
    return new ApiResponse<Todo>({
      statusCode: HttpStatus.CREATED,
      message: 'Todo has been created!',
      data: this.service.createTodo(body),
    });
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(todoUpdateSchema))
  async updateTodo(@Body() body: TodoUpdateDto) {
    return new ApiResponse<Todo>({
      data: await this.service.updateTodo(body),
      message: 'Todo has been updated!',
    });
  }

  @Delete(':id')
  async deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return new ApiResponse<Todo>({
      data: await this.service.deleteTodo(id),
      message: 'Todo has been deleted!',
    });
  }
}
