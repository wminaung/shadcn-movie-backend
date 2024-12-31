"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Loading from "@/components/Loading";
import { useMovieStore } from "@/store/movie";
import { Movie } from "@/core/entity/Movie";
import { createMovie } from "@/store/movie/movieActions";
import { CreateMoviePayload } from "@/core/infrastructure/movie/IMovieRepository";
import { MultiSelect } from "../multi-select";
import { useCategoryStore } from "@/store/category/categoryStore";

const CreateMoviePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateMoviePayload>();
  const { addMovie, error, loading } = useMovieStore();
  const { categories } = useCategoryStore();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<CreateMoviePayload> = async (data) => {
    if (!data) {
      return;
    }
    const newMovie = await createMovie(data);
    if (!newMovie) {
      console.log("Movie Create Fail!!!!!!!!");
    } else {
      addMovie(newMovie);
    }

    reset(); // Clear the input fields after submission
    setAlertMessage(`You created a new movie: ${data.title}`);
    setTimeout(() => setAlertMessage(null), 5000); // Hide alert after 5 seconds
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {error}
            <a href="/movie/create"> refresh</a>
          </span>
        </div>
      </div>
    );

  if (loading) return <Loading />;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Movie</h1>
      {alertMessage && (
        <div
          className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded "
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{alertMessage}</span>
          <button
            onClick={() => setAlertMessage(null)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="text-green-700">&times;</span>
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-500"
          >
            Title
          </label>
          <Input
            id="title"
            type="text"
            defaultValue={"win"}
            {...register("title", { required: "Title is required" })}
            className="mt-1"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-500"
          >
            Category
          </label>
          <div className="">
            <MultiSelect
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onValueChange={(value) => {
                setValue("categoryIds", value);
                // setNewMovie({ ...newMovie, categoryIds: value });
              }}
              placeholder="Select category"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
          {/* <Input
            id="category"
            type="text"
            {...register("category", { required: "Category is required" })}
            className="mt-1"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )} */}
        </div>
        <div>
          <label
            htmlFor="release_year"
            className="block text-sm font-medium text-gray-500"
          >
            Release Year
          </label>
          <Input
            id="release_year"
            defaultValue={2021}
            type="number"
            {...register("release_year", {
              required: "Release year is required",
              valueAsNumber: true,
            })}
            className="mt-1"
          />
          {errors.release_year && (
            <p className="text-red-500 text-sm">
              {errors.release_year.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-500"
          >
            Description
          </label>
          <Textarea
            defaultValue={"win desc"}
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            className="mt-1"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-500"
          >
            Rating
          </label>
          <Input
            id="rating"
            type="number"
            defaultValue={5}
            step="0.1"
            {...register("rating", {
              required: "Rating is required",
              valueAsNumber: true,
              min: 0,
              max: 10,
            })}
            className="mt-1"
          />
          {errors.rating && (
            <p className="text-red-500 text-sm">{errors.rating.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="director"
            className="block text-sm font-medium text-gray-500"
          >
            Director
          </label>
          <Input
            id="director"
            type="text"
            defaultValue={"win director"}
            {...register("director", { required: "Director is required" })}
            className="mt-1"
          />
          {errors.director && (
            <p className="text-red-500 text-sm">{errors.director.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="runtime"
            className="block text-sm font-medium text-gray-500"
          >
            Runtime (in minutes)
          </label>
          <Input
            id="runtime"
            type="number"
            defaultValue={120}
            {...register("runtime", {
              required: "Runtime is required",
              valueAsNumber: true,
            })}
            className="mt-1"
          />
          {errors.runtime && (
            <p className="text-red-500 text-sm">{errors.runtime.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Create Movie
        </Button>
      </form>
    </div>
  );
};

export default CreateMoviePage;
