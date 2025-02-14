"use client";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import ShowImage from "@/components/ShowImage";
import { Button } from "@/components/ui/button";
import { CreateMoviePayload } from "@/core/infrastructure/movie/IMovieRepository";
import {
  deleteMoviesByCategoryIds,
  updateMovie,
} from "@/store/movie/movieActions";
import { useMovieStore } from "@/store/movie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MultiSelect } from "../multi-select";
import { useCategoryStore } from "@/store/category/categoryStore";
import MovieNotFound from "../MovieNotFound";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { nextPublicSupabaseBucketName } from "@/constants/constants";
import { uploadImage } from "@/db/storage/upload";
import ImageLoading from "../ImageLoading";
import { getFile, isValidFileType } from "@/utils/files";

interface Props {
  params: { id: string };
}

const EditMovieByIdPage = ({ params }: Props) => {
  const [newMovie, setNewMovie] = useState<CreateMoviePayload | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [init, setInit] = useState(false);
  const { error, loading, movies, editMovie, removeMovie } = useMovieStore();
  const { categories, filterCategories } = useCategoryStore();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [oldMovie, setOldMovie] = useState<CreateMoviePayload | null>(null);

  const [invalidId, setInvalidId] = useState(false);

  useEffect(() => {
    if (!init && movies.length > 0) {
      (async () => {
        const movie = movies.find((m) => m.id === params.id);
        if (!movie) return setInvalidId(true);

        const filteredCategories = await filterCategories({
          movieId: params.id,
        });
        const filteredCategoryIds = filteredCategories.map((cat) => cat.id);
        if (!movie) {
          console.info("There is no movie in state");
          setOldMovie(null);
          setNewMovie(null);
          return;
        }
        const { id, ...movieWithoutId } = movie;
        setNewMovie({ ...movieWithoutId, categoryIds: filteredCategoryIds });
        setOldMovie({ ...movieWithoutId, categoryIds: filteredCategoryIds });
        setInit(true);
      })();
    }

    const newMovieJson = JSON.stringify(newMovie);
    const oldMovieJson = JSON.stringify(oldMovie);
    setDisabled(newMovieJson === oldMovieJson);
  }, [newMovie, movies]);

  if (invalidId) {
    return <MovieNotFound />;
  }

  if (error) return <Error message={error} />;
  if (loading || !newMovie) return <Loading />;

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
    const updatedMovie = await updateMovie(params.id, newMovie);
    if (!updatedMovie) {
      console.log("can not update movie");
      setDisabled(false);
      return;
    }
    editMovie(updatedMovie);
    const filteredCategories = await filterCategories({
      movieId: params.id,
    });
    const { id, ...movieWithoutId } = updatedMovie;
    const filteredCategoryIds = filteredCategories.map((cat) => cat.id);
    setNewMovie({ ...movieWithoutId, categoryIds: filteredCategoryIds });
    setOldMovie({ ...movieWithoutId, categoryIds: filteredCategoryIds });

    alert("Movie updated successfully");
    setDisabled(false);
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
    setNewMovie({ ...newMovie, image: url });
    setUploading(false);
  };

  return (
    <div className="flex flex-col  sm:flex-row items-center sm:items-start p-0 m-0">
      <div className="mx-2 rounded-md">
        <ShowImage
          image={newMovie.image}
          customClassName="rounded-lg w-[180px] sm:w-[300px]"
        />
      </div>
      <div className="py-8 flex container sm:contain-none w-full flex-col px-3  md:w-[400px] lg:w-[500px] rounded-md">
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
        </div>
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

          <div className="">
            <MultiSelect
              value={newMovie.categoryIds || []}
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onValueChange={(value) => {
                setNewMovie({ ...newMovie, categoryIds: value });
              }}
              style={{ backgroundColor: "#121212" }}
              defaultValue={oldMovie?.categoryIds}
              placeholder="Select frameworks"
              variant="inverted"
              animation={2}
              maxCount={3}
            />
          </div>
          {/* // */}
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

          <div className="flex justify-between">
            <Button
              type="submit"
              variant={"default"}
              disabled={disabled}
              className="active:scale-95"
              size={"sm"}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              className="active:scale-95 "
              size={"sm"}
              onClick={async () => {
                if (confirm("Are you sure want to delete this movie")) {
                  const deletedMovie = await deleteMoviesByCategoryIds(
                    params.id,
                    oldMovie?.categoryIds
                  );
                  if (deletedMovie) {
                    removeMovie(deletedMovie);
                    alert(`You deleted movie ${params.id}`);
                    router.push("/admin/movie");
                  }
                }
              }}
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieByIdPage;
