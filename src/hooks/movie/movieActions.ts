"use server";

import { movieService } from "@/core";
import { MovieService } from "@/lib/movieService";
import { authCheck } from "@/lib/utils";
import { Movie } from "@prisma/client";

export const getAllMovies = async (params?: MovieService.GetMoviesParam) => {
  return await movieService.getAll({
    category: params?.category || undefined,
    title: params?.title || undefined,
  });
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
