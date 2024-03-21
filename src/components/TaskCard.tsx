import React, { useState } from "react";
import { Id, Task } from "../types";
import TrashIcon from "../icons/TrashIcon";

interface TaskProps {
  task: Task;
  deleteTask(id: Id): void;
}

const TaskCard: React.FC<TaskProps> = ({ task, deleteTask }) => {
  const [isOverTask, setIsOverTask] = useState<boolean>(false);

  return (
    <div
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] flex items-center rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative"
      onMouseEnter={() => setIsOverTask(true)}
      onMouseLeave={() => setIsOverTask(false)}
    >
      {task.content}
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
