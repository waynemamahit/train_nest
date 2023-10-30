import { z } from 'zod';

export const todoCreateSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export type TodoCreateDto = z.infer<typeof todoCreateSchema>;

export const todoUpdateSchema = todoCreateSchema.extend({
  id: z.number(),
});

export type TodoUpdateDto = z.infer<typeof todoUpdateSchema>;
