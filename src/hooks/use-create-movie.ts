import { Movie } from "@prisma/client";
import { useState } from "react";

export interface MoviePayload extends Omit<Movie, "id"> {}

const useCreateMovie = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Movie | null>(null);

  const createMovie = async (movie: MoviePayload, url: string) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (!response.ok) {
        throw new Error("Failed to create movie");
      }

      const data = await response.json();
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
