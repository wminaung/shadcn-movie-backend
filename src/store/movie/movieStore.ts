"use client";
import { create } from "zustand";
import { MovieState } from "./types";
import { movieService } from "@/core";
import {
  getAllMovies,
  getMoviesByCategoryId,
  getMoviesByCategoryName,
  getMoviesByTitle,
} from "./movieActions";

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  loading: false,
  error: null,
  setMovies: (movies) => set({ movies }),
  fetchMovies: async () => {
    set({ loading: true });
    try {
      const movies = await getAllMovies();
      set({ movies, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch movies", loading: false });
    }
  },

  filterMovies: async (searchParam) => {
    if (searchParam?.category) {
      const movies = await getMoviesByCategoryName(searchParam.category);
      return movies;
    }
    if (searchParam?.title) {
      const movies = await getMoviesByTitle(searchParam.title);
      return movies;
    }
    if (searchParam.categoryId) {
      return await getMoviesByCategoryId(searchParam.categoryId);
    }
    return await getAllMovies();
  },
  addMovie: async (newMovie) => {
    set((state) => ({
      movies: [...state.movies, newMovie],
    }));
  },
  editMovie: async (movie) => {
    set((state) => ({
      movies: state.movies.map((m) => (m.id === movie.id ? movie : m)),
    }));
  },
  removeMovie: async (movie) => {
    set((state) => ({
      movies: state.movies.filter((m) => m.id !== movie.id),
    }));
  },
}));
