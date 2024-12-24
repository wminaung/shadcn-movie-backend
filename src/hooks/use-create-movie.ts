import apiService, { ApiService } from "@/lib/apiService";
import { Movie } from "@prisma/client";
import { useState } from "react";

export interface MoviePayload extends Omit<Movie, "id"> {}
export interface CreateMovieParam {
  movie: MoviePayload;
}

const useCreateMovie = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Movie | null>(null);

  const createMovie = async ({ movie }: CreateMovieParam) => {
    setLoading(true);
    try {
      const data = await apiService.postMovie({ data: movie });
      setData(data);
    } catch (error: unknown) {
      if (error instanceof Error) setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, data, createMovie };
};

export default useCreateMovie;
