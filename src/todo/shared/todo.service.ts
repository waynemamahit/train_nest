import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoCreateDto, TodoUpdateDto } from 'src/dto/todo.dto';
import { TodoQuery } from 'src/interfaces/todo.interface';
import { Todo } from './../../interfaces/todo.interface';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];

  getTodos = (query: TodoQuery | undefined) =>
    this.todos.filter(({ title, created_at, updated_at }: Todo) => {
      const parseString = (value: string | undefined) =>
        (value ?? '').toLowerCase();

      return (
        new RegExp(parseString(query?.title), 'i').test(title) ||
        created_at === parseString(query?.created_at) ||
        updated_at === parseString(query?.updated_at)
      );
    });

  createTodo(body: TodoCreateDto) {
    const dateCreated = new Date().toJSON();
    const newTodo = {
      id: this.todos.length + 1,
      created_at: dateCreated,
      updated_at: dateCreated,
      ...body,
    };
    this.todos.push(newTodo);

    return newTodo;
  }

  async updateTodo(body: TodoUpdateDto): Promise<Todo | undefined> {
    const { todo, callback } = await this.findTodo(body.id);
    const updatedTodo = {
      ...todo,
      ...body,
      updated_at: new Date().toJSON(),
    };
    this.todos[this.todos.findIndex(callback)] = updatedTodo;

    return updatedTodo;
  }

  async deleteTodo(id: number) {
    const { todo, callback } = await this.findTodo(id);
    this.todos.splice(this.todos.findIndex(callback), 1);

    return todo;
  }

  private async findTodo(bodyId: number) {
    const callback = ({ id }: Todo) => id === bodyId;

    const todo = this.todos.find(callback);
    if (typeof todo === 'undefined')
      throw new NotFoundException('Not Found Todo!');

    return {
      callback,
      todo,
    };
  }
}
