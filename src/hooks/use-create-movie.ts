import apiService, { ApiService } from "@/lib/fetching";
import { Movie } from "@prisma/client";
import { useState } from "react";

export interface MoviePayload extends Omit<Movie, "id"> {}
export interface CreateMovieParam {
  movie: MoviePayload;
  url: string;
}

const useCreateMovie = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Movie | null>(null);

  const createMovie = async ({ movie, url }: CreateMovieParam) => {
    setLoading(true);
    try {
      const fetchDataParam: ApiService.FetchDataParam = {
        url,
        method: ApiService.HttpMethod.POST,
        contentType: ApiService.ContentType.JSON,
        options: {
          body: JSON.stringify(movie),
        },
      };
      const data = await apiService.fetchData<Movie>(fetchDataParam);

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
