"use client";

import { Category } from "@/core/entity/Category";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import CategoryItem from "./CategoryItem";

interface Props {
  categories: Category[];
}
const ShowCategories = ({ categories }: Props) => {
  return (
    <SortableContext items={categories} strategy={rectSortingStrategy}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </SortableContext>
  );
};

export default ShowCategories;
