"use client";

import Error from "@/components/Error";
import Loading from "@/components/Loading";
import MyImageCard from "@/components/MyImageCard";
import { useMovieStore } from "@/store/movie";

import { useEffect, useState } from "react";
interface Props {
  searchParams: { title?: string; category?: string };
}
export default function AllMoviePage({ searchParams }: Props) {
  const { movies, loading, error, filterMovies, filteredMovies } =
    useMovieStore();

  useEffect(() => {
    filterMovies(searchParams);
  }, [searchParams, movies]);

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;
  return (
    <div className="mx-auto xs:mx-0 xs:w-full sm:container sm:px-4 md:mx-auto transition-all">
      <div className="grid items-stretch min-w-[300px] grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 transition-all md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4">
        {filteredMovies?.map((movie) => (
          <MyImageCard
            key={movie.id}
            movie={movie}
            customClassName="w-[130px] xs:w-[120px] sm:w-[180px] md:w-[200px] lg:w-[200px]"
          />
        ))}
      </div>
    </div>
  );
}
