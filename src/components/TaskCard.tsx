import React, { useState } from "react";
import { TaskProps } from "../types";
import TrashIcon from "../icons/TrashIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "../elements/Button/Button";

const TaskCard: React.FC<TaskProps> = ({ task, deleteTask, updateTask }) => {
  const [isOverTask, setIsOverTask] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setIsOverTask(false);
  };

  if (isDragging) {
    return (
      <div
        className="opacity-30 bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center rounded-xl  cursor-grab relative border-2 border-rose-500"
        ref={setNodeRef}
        style={style}
      />
    );
  }

  if (editMode) {
    return (
      <div
        className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <textarea
          className="h-[90%] w-full resize-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Write your task"
          onBlur={toggleEditMode}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) toggleEditMode();
          }}
          onChange={(e) => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => setIsOverTask(true)}
      onMouseLeave={() => setIsOverTask(false)}
      onClick={toggleEditMode}
    >
      <p className="my-auto h-[90%] w-[90%] overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {isOverTask && (
        <Button
          clickHandler={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </Button>
      )}
    </div>
  );
};

export default TaskCard;
