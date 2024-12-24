// src/application/services/todoService.ts
import { ToDoItem } from '../../domain/models/todos';
import { FileToDoRepository } from '../../infrastructure/file-system/fileTodoRepository';

const todoRepository = new FileToDoRepository();

export const ToDoService = {
  getAll: () => todoRepository.getAll(),
  getById: (id: string) => todoRepository.getById(id),
  create: (item: ToDoItem) => todoRepository.create(item),
  update: (item: ToDoItem) => todoRepository.update(item),
  delete: (id: string) => todoRepository.delete(id),
};
