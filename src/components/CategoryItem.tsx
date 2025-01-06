"use client";

import { FiFilm } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { Category } from "@/core/entity/Category";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const CategoryItem = ({ category }: { category: Category }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: category.id });

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
      className=" bg-[#121212] p-4 active:cursor-grabbing hover:cursor-grab rounded-lg shadow-md hover:shadow-lg  relative"
    >
      <div className="flex items-center space-x-2">
        <FiFilm className="text-blue-500 text-2xl" />
        <h2 className="text-lg text-white font-medium">{category.name}</h2>
      </div>

      <div className="absolute top-4 right-4 flex gap-1">
        <Button
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Edit");
          }}
        >
          Edit
        </Button>
        <Button
          size={"sm"}
          onClick={(e) => {
            e.stopPropagation();
            console.log("Delete");
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;
