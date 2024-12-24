
import { promises as fs } from 'fs';
import path from 'path';
import { ToDoItem } from '../../domain/models/todos';
import { ToDoRepository } from '../../domain/repositories/todoRepository';

const filePath = path.resolve(process.cwd(), 'data', 'todos.json');

export class FileToDoRepository implements ToDoRepository {
  async getAll(): Promise<ToDoItem[]> {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data) as ToDoItem[];
  }

  async getById(id: string): Promise<ToDoItem | null> {
    const items = await this.getAll();
    return items.find(item => item.id === id) || null;
  }

  async create(item: ToDoItem): Promise<void> {
    const items = await this.getAll();
    items.push(item);
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  }

  async update(item: ToDoItem): Promise<void> {
    let items = await this.getAll();
    items = items.map(i => (i.id === item.id ? item : i));
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  }

  async delete(id: string): Promise<void> {
    let items = await this.getAll();
    items = items.filter(item => item.id !== id);
    await fs.writeFile(filePath, JSON.stringify(items, null, 2));
  }
}
