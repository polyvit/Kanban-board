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
}

export interface TaskProps {
  task: Task;
}