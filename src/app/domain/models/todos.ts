
export interface ToDoItem {
    id: string;
    content: string;
    dueDate?: string;  // optional
    status: 'unfinished' | 'done';
  }
  