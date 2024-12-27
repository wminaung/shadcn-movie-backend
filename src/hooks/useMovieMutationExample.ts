import { useState } from "react";
import { Movie } from "@prisma/client";
import { movieService } from "@/core";

type MovieAction = "create" | "update" | "delete";

interface UseMovieMutationParams {
  action: MovieAction;
  movieId?: string;
  movieData?: Movie;
}

export const useMovieMutationExample = ({
  action,
  movieId,
  movieData,
}: UseMovieMutationParams) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<Movie | null>(null);

  const mutate = async () => {
    setLoading(true);
    setError(null);
    try {
      let result;
      switch (action) {
        case "create":
          if (!movieData)
            throw new Error("Movie data is required for creation");
          result = await movieService.create(movieData);
          break;
        case "update":
          if (!movieId || !movieData)
            throw new Error("Movie ID and data are required for update");
          result = await movieService.update(movieId, movieData);
          break;
        case "delete":
          if (!movieId) throw new Error("Movie ID is required for deletion");
          result = await movieService.delete(movieId);
          break;
        default:
          throw new Error("Invalid movie action");
      }
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error, data };
};
