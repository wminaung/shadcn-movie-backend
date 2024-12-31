"use server";

import { movieService } from "@/core";

export const getAllCategory = async () => {
  const categories = await movieService.getAllCategory();
  return categories;
};

export const getCategoriesByMovieId = async (movieId: string) => {
  const categories = await movieService.getCategoriesByMovieId(movieId);
  return categories;
};
