
import { ToDoItem } from '../models/todos';

export interface ToDoRepository {
  getAll(): Promise<ToDoItem[]>;
  getById(id: string): Promise<ToDoItem | null>;
  create(item: ToDoItem): Promise<void>;
  update(item: ToDoItem): Promise<void>;
  delete(id: string): Promise<void>;
}
