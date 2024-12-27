import { useState, useCallback } from "react";
import { Movie } from "@prisma/client";

import { MovieService } from "@/lib/movieService";
import { getAllMovies } from "./movieActions";

export const useMovieQuery = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // MovieService.GetMoviesParam
  const fetchMovies = useCallback(
    async (params?: MovieService.GetMoviesParam) => {
      try {
        setLoading(true);
        const data = await getAllMovies(params);
        setMovies(data);
      } catch (err) {
        setError("something wrong .....");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { movies, loading, error, fetchMovies };
};
