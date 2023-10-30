import { TodoCreateDto } from 'src/dto/todo.dto';

export type TodoQuery = {
  created_at: string;
  updated_at: string;
} & TodoCreateDto;

export type Todo = {
  id: number;
} & TodoQuery;
