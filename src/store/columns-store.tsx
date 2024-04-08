import { makeAutoObservable } from "mobx";
import { Column, Id } from "../types";
import { generateId } from "../utils/common";

class ColumnsStore {
  columns: Column[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setColumns = (array: Column[]) => {
    this.columns = array;
  };

  createNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${this.columns.length + 1}`,
    };
    this.columns = [...this.columns, newColumn];
  };

  deleteColumn = (id: Id) => {
    const filteredArray = this.columns.filter((col) => col.id !== id);
    this.columns = filteredArray;
  };

  updateColumnTitle = (id: Id, value: string) => {
    const newColumns = this.columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title: value };
    });
    this.columns = newColumns;
  };
}

export default new ColumnsStore();
