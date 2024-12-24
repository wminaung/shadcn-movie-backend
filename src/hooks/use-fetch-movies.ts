import apiService, { ApiService } from "@/lib/apiService";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

const useFetchMovies = ({ category, title }: ApiService.GetMoviesParam) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await apiService.getMovies({ title, category });

        setMovies(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [title, category]);

  return { movies, loading, error };
};

export default useFetchMovies;
