import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import { Column, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";
import { Button } from "../elements/Button/Button";
import { observer } from "mobx-react-lite";
import columnsStore from "../store/columns-store";
import tasksStore from "../store/tasks-store";

const KanbanBoard = observer(() => {
  const { columns, setColumns, createNewColumn } = columnsStore;
  const { tasks, setTasks } = tasksStore;

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const onDragStartHandler = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "Column") {
      setActiveColumn(active.data.current.column);
      return;
    }
    if (active.data.current?.type === "Task") {
      setActiveTask(active.data.current.task);
      return;
    }
  };

  const onDragEndHandler = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const generateColumns = (columns: Column[]): Column[] => {
        const oldIndex = columns.findIndex((col) => col.id === active.id);
        const newIndex = columns.findIndex((col) => col.id === over.id);
        return arrayMove(columns, oldIndex, newIndex);
      };
      setColumns(generateColumns(columns));
    }
  };

  const onDragOverHandler = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      const generateTasks = (tasks: Task[]): Task[] => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);

        tasks[oldIndex].columnId = tasks[newIndex].columnId;

        return arrayMove(tasks, oldIndex, newIndex);
      };
      setTasks(generateTasks(tasks));
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      const generateTasks = (tasks: Task[]): Task[] => {
        const activeIndex = tasks.findIndex((task) => task.id === active.id);

        tasks[activeIndex].columnId = over.id;

        return arrayMove(tasks, activeIndex, activeIndex);
      };
      setTasks(generateTasks(tasks));
    }
  };

  return (
    <div className="flex m-auto min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStartHandler}
        onDragEnd={onDragEndHandler}
        onDragOver={onDragOverHandler}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <Button
            clickHandler={() => createNewColumn()}
            className="flex gap-2 cursor-pointer border-2 h-[60px] w-[350px] min-w-[350px] rounded-lg bg-mainBackgroundColor border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2"
          >
            <PlusIcon />
            Add column
          </Button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
});

export default KanbanBoard;
