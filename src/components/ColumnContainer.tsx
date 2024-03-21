import React, { useMemo, useState } from "react";
import { Column, Id, Task } from "../types";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: Column;
  tasks: Task[];
  deleteColumn(id: Id): void;
  updateColumnTitle(id: Id, value: string): void;
  createTask(columnId: Id): void;
  deleteTask(id: Id): void;
  updateTask(id: Id, content: string): void;
}

const ColumnContainer: React.FC<ColumnProps> = ({
  column,
  deleteColumn,
  updateColumnTitle,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);
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
    disabled: editMode,
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
      />
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
        onClick={() => setEditMode(true)}
        className="flex items-center justify-between bg-mainBackgroundColor text-md h-[60px] rounded-md rounded-b-none cursor-grab p-3 font-bold border-columnBackgroundColor border-4"
      >
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">
            0
          </div>
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-black focus:border-rose-500 border-rounded outline-none px-2"
              value={column.title}
              autoFocus
              onChange={(e) => updateColumnTitle(column.id, e.target.value)}
              onBlur={() => setEditMode(false)}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2"
        >
          <TrashIcon />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-y-auto overflow-x-hidden">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => createTask(column.id)}
      >
        <PlusIcon />
        Add Task
      </button>
    </div>
  );
};

export default ColumnContainer;
