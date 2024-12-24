import apiService, { ApiService } from "@/lib/apiService";
import { Movie } from "@prisma/client";
import { useEffect, useState } from "react";

interface Param {
  id: string;
}
const useFetchMovieById = ({ id }: Param) => {
  const [movie, setMovie] = useState<Movie>({} as Movie);
  const [newMovie, setNewMovie] = useState<Movie>({} as Movie);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovieById = async () => {
      try {
        const data = await apiService.getMovieById({ id: id });

        setMovie(data);
        setNewMovie(data);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieById();
  }, [id]);

  useEffect(() => {
    if (JSON.stringify(movie) === JSON.stringify(newMovie)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [movie, newMovie]);

  const updateMovie = async (id: string): Promise<boolean> => {
    if (JSON.stringify(movie) === JSON.stringify(newMovie)) {
      console.log("No changes detected, update not required.");
      return false;
    }

    const data = await apiService.putMovieById({
      id: id,
      data: newMovie,
    });

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
