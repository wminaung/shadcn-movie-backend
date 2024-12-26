import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { Movie } from "@prisma/client";
import { ParamsProps, QueryProps } from "@/types/base";
import { authCheck } from "@/lib/utils";

// Edit Movie

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params["id"];
  const newMovie = (await request.json()) as Movie;

  const movie = await prisma.movie.findUnique({ where: { id: id } });

  if (!movie) {
    console.log("no Movie >>>>>>>>>>>>>>>");
    return NextResponse.redirect(new URL("/movie", request.url));
  }
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

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const id = params["id"];

  try {
    const deletedMovie = await prisma.movie.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(deletedMovie, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Cannot delete this movie id=${id}`, error },
      { status: 500 }
    );
  }
}
