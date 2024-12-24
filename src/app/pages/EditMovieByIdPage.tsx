"use client";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import MyImageCard from "@/components/MyImageCard";
import { Button } from "@/components/ui/button";
import { nextPublicApiUrl } from "@/constants/constants";
import useFetchMovieById from "@/hooks/use-fetch-movie-by-id";
import { convertMinutesToHoursAndSeconds } from "@/lib/utils";
import React, { useEffect, useState } from "react";

interface Props {
  params: { id: string };
}

const EditMovieByIdPage = ({ params }: Props) => {
  const {
    error,
    loading,
    movie,
    newMovie,
    setNewMovie,
    updateMovie,
    disabled,
    setDisabled,
  } = useFetchMovieById({ id: params.id });

  if (error) return <Error message={error} />;
  if (loading) return <Loading />;

  const id = params.id;
  const duration = convertMinutesToHoursAndSeconds(movie.runtime);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "rating") {
      let v = parseFloat(value);
      if (isNaN(v)) v = 0;
      setNewMovie({ ...newMovie, [name]: v });
    } else if (name === "release_year" || name === "runtime") {
      let v = parseInt(value, 10);
      if (isNaN(v)) v = 0;
      setNewMovie({ ...newMovie, [name]: v });
    } else {
      setNewMovie({ ...newMovie, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setDisabled(true);
    await updateMovie(params.id);
    alert("Movie updated successfully");
    setDisabled(false);
  };

  return (
    <div className="flex flex-col  sm:flex-row items-center sm:items-start ">
      <div className="w-[400px] py-8 px-12 rounded-md">
        <MyImageCard asImage movie={movie} customClassName="rounded-lg" />
      </div>
      <div className="py-8 flex flex-col px-3 w-dvw md:w-[400px] lg:w-[500px] rounded-md">
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="Title">Title </label>
            <input
              type="text"
              name="title"
              value={newMovie.title}
              onChange={handleChange}
              placeholder="Title"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="Director">Director </label>
            <input
              type="text"
              name="director"
              value={newMovie.director}
              onChange={handleChange}
              placeholder="Director"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="release_year">Release Year </label>
            <input
              type="text"
              name="release_year"
              value={newMovie.release_year}
              onChange={handleChange}
              placeholder="Release Year"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="runtime">Runtime </label>
            <input
              type="text"
              name="runtime"
              value={newMovie.runtime}
              onChange={handleChange}
              placeholder="Runtime"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="category">Category </label>
            <input
              type="text"
              name="category"
              value={newMovie.category}
              onChange={handleChange}
              placeholder="Category"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="Rating">Rating </label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={newMovie.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="Description">Description </label>
            <textarea
              name="description"
              value={newMovie.description}
              onChange={handleChange}
              placeholder="Description"
              className="mb-2 p-2 border rounded w-full"
            />
          </div>
          <Button
            type="submit"
            variant={"default"}
            disabled={disabled}
            className="active:scale-95"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditMovieByIdPage;
