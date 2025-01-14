"use server";

import { movieService } from "@/core";
import {
  CreateMoviePayload,
  GetAllMoviesOption,
  UpdateMoviePayload,
} from "@/core/infrastructure/movie/IMovieRepository";

import { authCheck } from "@/lib";

export const getAllMovies = async (option?: GetAllMoviesOption) => {
  return movieService.getAll(option);
};

export const getMovie = async (id: string) => {
  return await movieService.get(id);
};

export const createMovie = async (data: CreateMoviePayload) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.create(data);
};

export const updateMovie = async (id: string, data: UpdateMoviePayload) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.update(id, data);
};

export const deleteMovie = async (id: string) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.delete(id);
};

export const deleteMoviesByCategoryIds = async (
  id: string,
  categoryIds?: string[]
) => {
  if (!authCheck()) throw new Error("auth required");
  return await movieService.deleteMoviesByCategoryIds(id, categoryIds);
};

export const getMoviesByCategoryId = async (categoryId: string) => {
  return await movieService.getMoviesByCategoryId(categoryId);
};

export const getMoviesByCategoryName = async (categoryName: string) => {
  return await movieService.getMoviesByCategoryName(categoryName);
};
export const getMoviesByTitle = async (title: string) => {
  return await movieService.getMoviesByTitle(title);
};
