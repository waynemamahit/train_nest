import { todoCreateSchema } from '../dto/todo.dto';
import { ZodValidationPipe } from './zod-validation.pipe';

describe('ZodValidationPipe', () => {
  it('should be defined', () => {
    expect(new ZodValidationPipe(todoCreateSchema)).toBeDefined();
  });
});
