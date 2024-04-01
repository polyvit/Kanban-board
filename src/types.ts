export type Id = string | number

export type Column = {
    id: Id;
    title: string;
}

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
}

export interface ColumnProps {
  column: Column;
  tasks: Task[];
  deleteColumn(id: Id): void;
  updateColumnTitle(id: Id, value: string): void;
  createTask(columnId: Id): void;
  deleteTask(id: Id): void;
  updateTask(id: Id, content: string): void;
}

export interface TaskProps {
  task: Task;
  deleteTask(id: Id): void;
  updateTask(id: Id, content: string): void;
}