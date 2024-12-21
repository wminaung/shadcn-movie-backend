import prisma from "@/lib/prisma";
import { cacheFetch, redis } from "@/lib/redis";
import { NextResponse, type NextRequest } from "next/server";
import { Movie } from "@prisma/client";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const category = request.nextUrl.searchParams.get("category");

  const titleKey = `movie?title=${title}`;
  const categoryKey = `movie?category=${category}`;

  if (category) {
    // const searchMoviesByCategory = movies.filter(
    //   (movie) => movie.category.toLowerCase() === category.toLowerCase()
    // );

    const searchMoviesByCategory = await cacheFetch<Movie[]>(
      categoryKey,
      async () => {
        return await prisma.movie.findMany({
          where: {
            category: {
              contains: category,
              mode: "insensitive",
            },
          },
        });
      }
    );
    return NextResponse.json(searchMoviesByCategory);
  }

  if (title) {
    // const searchMoviesByTitle = movies.filter((movie) =>
    //   movie.title.toLowerCase().includes(title.toLowerCase())
    // );
    const searchMoviesByTitle = await cacheFetch<Movie[]>(
      titleKey,
      async () => {
        return await prisma.movie.findMany({
          where: {
            title: {
              contains: title,
              mode: "insensitive",
            },
          },
        });
      }
    );

    return NextResponse.json(searchMoviesByTitle);
  }

  const movies = await cacheFetch<Movie[]>("movie", async () => {
    const movies = await prisma.movie.findMany();

    return movies;
  });

  return NextResponse.json(movies);
}
