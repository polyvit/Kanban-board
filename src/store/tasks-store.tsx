import { Id, Task } from "../types";
import { makeAutoObservable } from "mobx";
import { generateId } from "../utils/common";

class TasksStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTasks = (array: Array<Task>) => {
    this.tasks = array;
  };

  createTask = (id: Id) => {
    const newTask = {
      id: generateId(),
      columnId: id,
      content: `Task ${this.tasks.length + 1}`,
    };
    this.tasks = [...this.tasks, newTask];
  };

  deleteTask = (id: Id) => {
    const filteredTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = filteredTasks;
  };

  updateTask = (id: Id, content: string) => {
    const correctedTasks = this.tasks.map((task) => {
      if (task.id !== id) return task;
      return { ...task, content };
    });
    this.tasks = correctedTasks;
  };

  deleteTasksWithColumn = (id: Id) => {
    const newTasks = this.tasks.filter((task) => task.columnId !== id);
    this.tasks = newTasks;
  };
}

export default new TasksStore();
