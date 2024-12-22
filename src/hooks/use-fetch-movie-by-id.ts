import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

const useFetchMovieById = (url: string) => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [newMovie, setNewMovie] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovie(data);
        setNewMovie(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById();
  }, [url]);

  useEffect(() => {
    if (JSON.stringify(movie) === JSON.stringify(newMovie)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [movie, newMovie]);

  const updateMovie = async (putUrl: string): Promise<boolean> => {
    if (JSON.stringify(movie) === JSON.stringify(newMovie)) {
      console.log("No changes detected, update not required.");
      return false;
    }

    const response = await fetch(`${putUrl}`, {
      method: "PUT",
      body: JSON.stringify(newMovie),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = (await response.json()) as Movie;

    if (!data) return false;
    setMovie({ ...data });
    setNewMovie({ ...data });
    return true;
  };

  return {
    movie,
    loading,
    error,
    newMovie,
    setNewMovie,
    updateMovie,
    setDisabled,
    disabled,
  };
};

export default useFetchMovieById;
