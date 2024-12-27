import { useState } from "react";

interface Filter {
  genre?: string;
  year?: number;
  rating?: number;
}

const useMovieFilters = () => {
  const [filters, setFilters] = useState<Filter>({});

  const setGenre = (genre: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, genre }));
  };

  const setYear = (year: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, year }));
  };

  const setRating = (rating: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, rating }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return {
    filters,
    setGenre,
    setYear,
    setRating,
    clearFilters,
  };
};

export default useMovieFilters;
