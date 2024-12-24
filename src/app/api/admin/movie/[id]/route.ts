import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { Movie } from "@prisma/client";
import { ParamsProps, QueryProps } from "@/types/base";

// Edit Movie

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const id = params["id"];
  const newMovie = (await request.json()) as Movie;
  console.log(newMovie);
  if (!id) {
    return NextResponse.json(
      { message: `Can not update! Params Error params=${id}` },
      { status: 404 }
    );
  }

  const movie = (await prisma.movie.findMany({ where: { id: id } }))[0];

  console.log(JSON.stringify(movie), JSON.stringify(newMovie));
  console.log(JSON.stringify(movie) === JSON.stringify(newMovie));
  if (JSON.stringify(movie) === JSON.stringify(newMovie)) {
    console.log("No changes detected, update not required.");
    return NextResponse.json(
      { message: "No changes detected, update not required." },
      { status: 404 }
    );
  }

  const updatedMovie = await prisma.movie.update({
    where: { id: id },
    data: {
      title: newMovie.title,
      director: newMovie.director,
      release_year: newMovie.release_year,
      runtime: newMovie.runtime,
      category: newMovie.category,
      rating: newMovie.rating,
      description: newMovie.description,
    },
  });

  return NextResponse.json(updatedMovie ? updatedMovie : null, { status: 200 });
}
