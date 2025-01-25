"use client";

import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import Notification from "../Notification";
import { Label } from "../ui/label";
import ImageLoading from "../ImageLoading";
import { getFile, isValidFileType } from "@/utils/files";
import { uploadImage } from "@/db/storage/upload";

const CreateMoviePage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState(``);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateMoviePayload>({
    defaultValues: {
      categoryIds: [],
      image: "",
      description: `desc`,
      title: `title`,
      director: `director`,
      release_year: 1999,
      rating: 4,
      runtime: 100,
    },
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const { addMovie, error, loading } = useMovieStore();
  const [uploading, setUploading] = useState(false);
  const { categories } = useCategoryStore();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [requiredCat, setRequiredCat] = useState(false);

  useEffect(() => {
    if (selectedCategories.length === 0 || imageUrl.trim() === ``) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [imageUrl, selectedCategories]);

  const [notification, setNotification] = useState<{
    message: string;
    redirectUrl: string;
    createdMovie: Movie;
  } | null>(null);

  const onSubmit: SubmitHandler<CreateMoviePayload> = async (data) => {
    setDisabled(true);

    if (!data) {
      setDisabled(false);
      return;
    }
    const newMovie = await createMovie(data);

    if (!newMovie) {
      setRequiredCat(true);
      console.error("Movie Create Fail!!!!!!!!");
    } else {
      setRequiredCat(false);
      addMovie(newMovie);
      setNotification({
        message: `created successfully: `,
        redirectUrl: `/admin/movie/${newMovie.id}/edit`,
        createdMovie: newMovie,
      });
      setImageUrl(``);
    }

    reset();
    setSelectedCategories([]); // Clear the input fields after submission
    setDisabled(false);
    setTimeout(() => setNotification(null), 5000); // Hide alert after 5 seconds
  };
  const close = () => {
    setNotification(null);
  };

  const handleCategoryChange = (value: string[]) => {
    setValue("categoryIds", value);
    if (value.length) {
      setRequiredCat(false);
    } else {
      setRequiredCat(true);
    }
    setSelectedCategories(value); // Update the UI state
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const file = getFile(e);
    if (!file) {
      setUploading(false);
      return;
    }
    if (!isValidFileType(file)) {
      alert("Please upload a JPEG or PNG image.");
      setUploading(false);
      return;
    }
    const url = await uploadImage(file);
    if (!url) {
      setUploading(false);
      return console.log(`url does not exit`);
    }

    setImageUrl(url);
    setValue("image", url);
    setUploading(false);
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
            <a href="/admin/create/movie"> refresh</a>
          </span>
        </div>
      </div>
    );

  if (loading) return <Loading />;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Create New Movie</h1>

      {notification && (
        <Notification notification={notification} close={close} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="image">Image</Label>

          {uploading ? (
            <ImageLoading />
          ) : (
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleFileChange}
              className="mb-2 p-2 border rounded w-full"
            />
          )}

          {imageUrl && (
            <div className="mt-2">
              <p>Image Preview:</p>
              <img
                src={imageUrl}
                alt="Picture preview"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
        </div>
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
              value={selectedCategories || []} // Controlled value
              onValueChange={handleCategoryChange}
              placeholder="Select category"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
            {requiredCat && (
              <p className="text-red-500 text-sm">{`category is required!`}</p>
            )}
          </div>
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
        <Button type="submit" disabled={disabled} className="w-full">
          Create Movie
        </Button>
      </form>
    </div>
  );
};

export default CreateMoviePage;
