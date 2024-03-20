import { useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Id } from "../types";
import { generateId } from "../utils/common";
import ColumnContainer from "./ColumnContainer";

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const createNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
  };

  const deleteColumn = (id: Id) => {
    const filteredArray = columns.filter((col) => col.id !== id);
    setColumns(filteredArray);
  };

  return (
    <div className="flex m-auto min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <div className="m-auto flex gap-4">
        <div className="flex gap-4">
          {columns.map((col) => (
            <ColumnContainer
              key={col.id}
              column={col}
              deleteColumn={deleteColumn}
            />
          ))}
        </div>
        <button
          onClick={() => createNewColumn()}
          className="flex gap-2 h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
        >
          <PlusIcon />
          Add column
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
