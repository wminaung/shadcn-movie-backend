import { response } from "@/lib/response";
import { NextRequest } from "next/server";
import {
  findManyMovie,
  findManyMovieByTitle,
  findManyMovieCategoryId,
  findManyMovieCategoryName,
} from "@/db/query/movie";
import { cacheFetch } from "@/lib/redis";
import { getMovieQuery } from "@/utils/get-query";

export async function GET(request: NextRequest) {
  const { title, category, categoryId } = getMovieQuery(request);

  if (!title && !category && !categoryId) {
    const movies = await cacheFetch(
      `movie:all`,
      async () => await findManyMovie()
    );
    return response(movies);
  }

  if (
    (title && category) ||
    (title && categoryId) ||
    (category && categoryId)
  ) {
    return response(
      {
        error:
          "Please provide only one parameter: title, category, or categoryId",
      },
      { status: 400 }
    );
  }

  if (title) {
    const movies = await cacheFetch(
      `movie:search:title:${title}`,
      async () => await findManyMovieByTitle(title)
    );

    return response(movies);
  }

  if (category) {
    const movies = await cacheFetch(
      `movie:search:category:${category}`,
      async () => await findManyMovieCategoryName(category)
    );
    return response(movies);
  }
  if (categoryId) {
    const movies = await cacheFetch(
      `movie:search:categoryId:${categoryId}`,
      async () => await findManyMovieCategoryId(categoryId)
    );
    return response(movies);
  }
}
