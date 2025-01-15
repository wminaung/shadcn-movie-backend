import { db } from "..";

export const findManyCategory = async () => {
  const categories = await db.category.findMany();
  return categories;
};

export const findUniqueCategory = async (categoryId: string) => {
  const categories = await db.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return categories;
};

export const findUniqueCategoryName = async (categoryName: string) => {
  const categories = await db.category.findUnique({
    where: {
      name: categoryName,
    },
  });
  return categories;
};
