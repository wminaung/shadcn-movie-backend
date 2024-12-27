import { useState, useCallback } from "react";
import { getMovie } from "./movieActions";
import { Movie } from "@/core/entity/Movie";

export const useMovieQueryById = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // MovieService.GetMoviesParam
  const fetchMovieById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const data = await getMovie(id);
      setMovie(data);
    } catch (err) {
      setError("something wrong .....");
    } finally {
      setLoading(false);
    }
  }, []);

  return { movie, loading, error, fetchMovieById };
};
