"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  MouseSensor,
  useSensors,
  DragStartEvent,
  UniqueIdentifier,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Task {
  id: string;
  title: string;
}

export default function Test() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Item 1" },
    { id: "2", title: "Item 2" },
    { id: "3", title: "Item 3" },
    { id: "4", title: "Item 4" },
  ]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
      scrollBehavior: "smooth",
    })
  );

  const getTaskPos = (id: UniqueIdentifier) =>
    tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      return;
    }
    if (active.id === over.id) return;

    setTasks((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);
      return arrayMove(tasks, originalPos, newPos);
    });
  };

  return (
    <div className="container">
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

function Column({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-secondary gap-2  shadow-xl w-[200px] ml-4 p-2">
      <SortableContext items={tasks} strategy={rectSortingStrategy}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </SortableContext>
    </div>
  );
}

function TaskItem({ id, title }: Task) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-black border rounded-sm shadow-md w-[80px] flex items-center justify-center h-20 border-black   my-3"
    >
      <p>
        {id}. {title}
      </p>
    </div>
  );
}
