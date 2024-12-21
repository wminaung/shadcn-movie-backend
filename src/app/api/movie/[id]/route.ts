import prisma from "@/lib/prisma";
import { cacheFetch } from "@/lib/redis";
import { ParamsProps } from "@/types/base";
import { NextResponse, type NextRequest } from "next/server";
import { Movie } from "@prisma/client";

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const id = params.id;
  // const searchMovie = movies.filter(
  //   (movie) => String(movie.id) === params.id
  // )[0];

  if (!id) {
    return NextResponse.json(
      { message: `Params Error params=${id}` },
      { status: 404 }
    );
  }

  const searchMovie = await cacheFetch<Movie>(`movie:${id}`, async () => {
    return await prisma.movie.findUnique({
      where: {
        id: id,
      },
    });
  });

  if (!searchMovie) {
    return NextResponse.json(
      { message: `Theres is no movie for id=${id}` },
      { status: 404 }
    );
  }

  return NextResponse.json(searchMovie);
}
