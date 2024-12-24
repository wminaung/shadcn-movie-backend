"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateMovie, { MoviePayload } from "@/hooks/use-create-movie";
import { nextPublicApiUrl } from "@/constants/constants";
import Loading from "@/components/Loading";

const CreateMoviePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MoviePayload>();
  const { createMovie, data, error, loading } = useCreateMovie();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<MoviePayload> = async (data) => {
    const url = `/admin/movie`;
    await createMovie({ movie: data, url });
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
          className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
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
          <Input
            id="category"
            type="text"
            {...register("category", { required: "Category is required" })}
            className="mt-1"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
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
