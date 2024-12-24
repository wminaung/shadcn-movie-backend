import prisma from "@/lib/prisma";
import { cacheFetch, redis } from "@/lib/redis";
import { NextResponse, type NextRequest } from "next/server";
import { Movie } from "@prisma/client";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  const category = request.nextUrl.searchParams.get("category");

  if (category) {
    const searchMoviesByCategory = await prisma.movie.findMany({
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
    // const searchMoviesByTitle = movies.filter((movie) =>
    //   movie.title.toLowerCase().includes(title.toLowerCase())
    // );
    const searchMoviesByTitle = await prisma.movie.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(searchMoviesByTitle);
  }

  const movies = await prisma.movie.findMany();

  return NextResponse.json(movies, { status: 200 });
}
