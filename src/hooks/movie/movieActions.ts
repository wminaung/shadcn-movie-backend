"use server";

import { movieDatabase } from "@/core";
import { MovieService } from "@/lib/movieService";
import { authCheck } from "@/lib/utils";
import { Movie } from "@prisma/client";

export const getAllMovie = async (params?: MovieService.GetMoviesParam) => {
  let win = undefined;
  if (params) {
    const { category, title } = params;
    win = title || category || undefined;
  }
  return await movieDatabase.getAll({
    where: {
      category: {
        contains: win,
        mode: "insensitive",
      },
    },
  });
};

export const getMovie = async (id: string) => {
  return await movieDatabase.get(id);
};

export const createMovie = async (data: Omit<Movie, "id">) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieDatabase.create(data);
};

export const updateMovie = async (
  id: string,
  data: Partial<Omit<Movie, "id">>
) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieDatabase.update(id, data);
};

export const deleteMovie = async (id: string) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieDatabase.delete(id);
};
