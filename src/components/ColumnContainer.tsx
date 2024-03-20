import React from "react";
import { Column, Id } from "../types";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ColumnProps {
  column: Column;
  deleteColumn(id: Id): void;
}

const ColumnContainer: React.FC<ColumnProps> = ({ column, deleteColumn }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col opacity-60 border-2 border-rose-500"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
    >
      <div
        {...attributes}
        {...listeners}
        className="flex items-center justify-between bg-mainBackgroundColor text-md h-[60px] rounded-md rounded-b-none cursor-grab p-3 font-bold border-columnBackgroundColor border-4"
      >
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
