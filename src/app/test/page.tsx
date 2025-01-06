"use client";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  UniqueIdentifier,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useCategoryStore } from "@/store/category/categoryStore";
import CreateCategoryDialog from "@/components/CreateCategoryDialog";
import ShowCategories from "@/components/ShowCategories";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const CategoryPage = () => {
  const { categories, loading, error, setCategories } = useCategoryStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getCategoryPos = (id: UniqueIdentifier) =>
    categories.findIndex((cat) => cat.id === id);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) {
      return;
    }
    if (active.id === over.id) return;
    const originalPos = getCategoryPos(active.id);
    const newPos = getCategoryPos(over.id);
    setCategories(arrayMove(categories, originalPos, newPos));
  };
  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CreateCategoryDialog />
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          <ShowCategories categories={categories} />
        </DndContext>
      </div>
    </div>
  );
};

export default CategoryPage;
