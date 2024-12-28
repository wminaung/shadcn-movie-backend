"use server";

import { movieService } from "@/core";
import { Movie } from "@/core/entity/Movie";
import { SearchOption } from "@/core/infrastructure/IMovieRepository";
import { authCheck } from "@/lib/utils";

export const getAllMovies = async (params?: SearchOption) => {
  return movieService.getAll(params);
};

export const getMovie = async (id: string) => {
  return await movieService.get(id);
};

export const createMovie = async (data: Omit<Movie, "id">) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.create(data);
};

export const updateMovie = async (
  id: string,
  data: Partial<Omit<Movie, "id">>
) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.update(id, data);
};

export const deleteMovie = async (id: string) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.delete(id);
};
