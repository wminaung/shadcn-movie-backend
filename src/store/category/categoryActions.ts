"use server";

import { categoryService } from "@/core";
import { CreateCategoryPayload } from "@/core/infrastructure/category/ICategoryRepository";

export const getAllCategory = async () => {
  const categories = await categoryService.getAll();
  return categories;
};

export const getCategoriesByMovieId = async (movieId: string) => {
  const categories = await categoryService.getCategoriesByMovieId(movieId);
  return categories;
};

export const createNewCat = async (cat: CreateCategoryPayload) => {
  const newCate = await categoryService.create(cat);
  return newCate;
};
