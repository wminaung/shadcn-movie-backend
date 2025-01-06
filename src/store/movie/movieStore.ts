"use client";
import { create } from "zustand";
import { MovieState } from "./types";
import {
  getAllMovies,
  getMoviesByCategoryId,
  getMoviesByCategoryName,
  getMoviesByTitle,
} from "./movieActions";

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  filteredMovies: [],
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
  filteredMoviesByCatId: async (catId) => {
    const filteredMovies = await getMoviesByCategoryId(catId);
    return filteredMovies;
  },
  setFilteredMovies: (filteredMovies) => {
    set({ loading: true });
    set({ filteredMovies: filteredMovies });
    set({ loading: false });
  },
  filterMovies: async (searchParam) => {
    set({ loading: true });
    try {
      let movies;

      if (searchParam?.category) {
        movies = await getMoviesByCategoryName(searchParam.category);
      } else if (searchParam?.title) {
        movies = await getMoviesByTitle(searchParam.title);
      } else if (searchParam?.categoryId) {
        movies = await getMoviesByCategoryId(searchParam.categoryId);
      } else {
        movies = await getAllMovies();
      }

      set({ filteredMovies: movies });
    } catch (error) {
      set({ error: "Failed to fetch movies" });
    } finally {
      set({ loading: false });
    }
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
