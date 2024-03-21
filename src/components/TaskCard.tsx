import React, { useState } from "react";
import { Id, Task } from "../types";
import TrashIcon from "../icons/TrashIcon";

interface TaskProps {
  task: Task;
  deleteTask(id: Id): void;
  updateTask(id: Id, content: string): void;
}

const TaskCard: React.FC<TaskProps> = ({ task, deleteTask, updateTask }) => {
  const [isOverTask, setIsOverTask] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setIsOverTask(false);
  };

  if (editMode) {
    return (
      <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative">
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
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
      onMouseEnter={() => setIsOverTask(true)}
      onMouseLeave={() => setIsOverTask(false)}
      onClick={toggleEditMode}
    >
      <p className="my-auto h-[90%] w-[90%] overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {isOverTask && (
        <button
          className="stroke-white absolute right-4 opacity-60 hover:opacity-100"
          onClick={() => deleteTask(task.id)}
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
