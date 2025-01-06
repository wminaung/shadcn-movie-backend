"use server";

import { movieService } from "@/core";
import { CreateCategoryPayload } from "@/core/entity/Category";

export const getAllCategory = async () => {
  const categories = await movieService.getAllCategory();
  return categories;
};

export const getCategoriesByMovieId = async (movieId: string) => {
  const categories = await movieService.getCategoriesByMovieId(movieId);
  return categories;
};

export const createNewCat = async (cat: CreateCategoryPayload) => {
  const newCate = await movieService.createCategory(cat);
  return newCate;
};
