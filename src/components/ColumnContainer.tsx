import React from "react";
import { Column, Id } from "../types";
import TrashIcon from "../icons/TrashIcon";

interface ColumnProps {
  column: Column;
  deleteColumn(id: Id): void;
}

const ColumnContainer: React.FC<ColumnProps> = ({ column, deleteColumn }) => {
  return (
    <div className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      <div className="flex items-center justify-between bg-mainBackgroundColor text-md h-[60px] rounded-md rounded-b-none cursor-grab p-3 font-bold border-columnBackgroundColor border-4">
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow">Content</div>
    </div>
  );
};

export default ColumnContainer;
