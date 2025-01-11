import { movieService } from "@/core";
import { response } from "@/lib/response";
import { Category, Movie, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import {
  findManyMovie,
  findManyMovieByTitle,
  findManyMovieCategoryId,
  findManyMovieCategoryName,
} from "@/lib/movieQueries";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title") || undefined;
  const category = request.nextUrl.searchParams.get("category") || undefined;
  const categoryId =
    request.nextUrl.searchParams.get("categoryId") || undefined;

  if (!title && !category && !categoryId) {
    // const movies = await movieService.getAll();

    const movies = await findManyMovie();
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
    const movies = await findManyMovieByTitle(title);
    return response(movies);
  }

  if (category) {
    const movies = await findManyMovieCategoryName(category);
    return response(movies);
  }
  if (categoryId) {
    const movies = await findManyMovieCategoryId(categoryId);
    return response(movies);
  }
}
