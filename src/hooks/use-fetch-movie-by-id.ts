import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

const useFetchMovieById = (url: string) => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovie(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById();
  }, [url]);

  return { movie, loading, error };
};

export default useFetchMovieById;
