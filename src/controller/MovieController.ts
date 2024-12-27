import { MovieDatabase } from "@/database/MovieDatabase";
import { MoviePayload } from "@/hooks/use-create-movie";
import { authCheck } from "@/lib/utils";
import { ParamsProps } from "@/types/base";
import { Movie, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export class MovieController {
  constructor(private movieDatabase: MovieDatabase) {}

  async getAll(request: NextRequest) {
    const title = request.nextUrl.searchParams.get("title");
    const category = request.nextUrl.searchParams.get("category");

    if (category) {
      const searchMoviesByCategory = await this.movieDatabase.getAll({
        where: {
          category: {
            contains: category,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json(searchMoviesByCategory);
    }

    if (title) {
      const searchMoviesByTitle = await this.movieDatabase.getAll({
        where: {
          title: {
            contains: title,
            mode: "insensitive",
          },
        },
      });
      return NextResponse.json(searchMoviesByTitle);
    }

    const movies = await this.movieDatabase.getAll();

    return NextResponse.json(movies, { status: 200 });
  }

  async get(request: NextRequest, { params }: ParamsProps) {
    const id = params["id"];

    if (!id) {
      return NextResponse.json(
        { message: `Params Error params=${id}` },
        { status: 404 }
      );
    }

    const searchMovie = await this.movieDatabase.get(id);

    if (!searchMovie) {
      return NextResponse.json(
        { message: `Theres is no movie for id=${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json(searchMovie, { status: 200 });
  }

  async create(request: NextRequest) {
    if (!(await authCheck())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      category,
      description,
      director,
      rating,
      release_year,
      runtime,
    } = (await request.json()) as MoviePayload;

    const movieSchema = z.object({
      title: z.string().min(1, "Title is required"),
      category: z.string().min(2, "Category is required"),
      description: z.string().min(5, "Description is required"),
      director: z.string().min(1, "Director is required"),
      rating: z.number().min(0).max(10, "Rating must be between 0 and 10"),
      release_year: z.number().int().positive("Release year is required"),
      runtime: z.number().int().positive("Runtime is required"),
    });

    const parsedMovie = movieSchema.safeParse({
      title,
      category,
      description,
      director,
      rating,
      release_year,
      runtime,
    });

    if (!parsedMovie.success) {
      return NextResponse.json(
        { error: parsedMovie.error.errors },
        { status: 400 }
      );
    }

    const newMovie = await this.movieDatabase.create(parsedMovie.data);

    return NextResponse.json(newMovie, { status: 201 });
  }

  async update(request: NextRequest, { params }: ParamsProps) {
    if (!(await authCheck())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const id = params["id"];
    const newMovie = (await request.json()) as Movie;

    const movie = await this.movieDatabase.get(id);

    if (!movie) {
      console.log("no Movie >>>>>>>>>>>>>>>");
      return NextResponse.redirect(new URL("/movie", request.url));
    }

    if (JSON.stringify(movie) === JSON.stringify(newMovie)) {
      console.log("No changes detected, update not required.");
      return NextResponse.json(
        { message: "No changes detected, update not required." },
        { status: 404 }
      );
    }
    const updatedMovie = await this.movieDatabase.update(id, newMovie);

    return NextResponse.json(updatedMovie ? updatedMovie : null, {
      status: 200,
    });
  }

  async delete(request: NextRequest, { params }: ParamsProps) {
    if (!(await authCheck())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const id = params["id"];

    try {
      const deletedMovie = await this.movieDatabase.delete(id);

      return NextResponse.json(deletedMovie, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: `Cannot delete this movie id=${id}`, error },
        { status: 500 }
      );
    }
  }

  //
}
