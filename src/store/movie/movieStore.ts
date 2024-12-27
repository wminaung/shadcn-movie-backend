"use client";
import { create } from "zustand";
import { MovieState } from "./types";

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  filteredMovies: [],
  loading: false,
  error: null,
  setMovies: (movies) => set({ movies }),
  filterMovies: async (searchOption) => {
    const { title, category } = searchOption || {};

    set((state) => ({
      filteredMovies: state.movies.filter((movie) => {
        if (title && category) {
          return (
            movie.title.toLowerCase().includes(title.toLowerCase()) &&
            movie.category.toLowerCase() === category.toLowerCase()
          );
        }
        if (title) {
          return movie.title.toLowerCase().includes(title.toLowerCase());
        }
        if (category) {
          return movie.category.toLowerCase() === category.toLowerCase();
        }
        return true;
      }),
    }));
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
  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const movies = await [];
      set({ movies, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch movies", loading: false });
    }
  },
}));
