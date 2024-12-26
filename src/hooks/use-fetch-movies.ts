import movieService, { MovieService } from "@/lib/movieService";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

const useFetchMovies = ({ category, title }: MovieService.GetMoviesParam) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getMovies({ title, category });

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
