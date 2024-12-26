import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";
import { MoviePayload } from "@/hooks/use-create-movie";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { authCheck } from "@/lib/utils";

// export async function GET(request: NextRequest) {
//   const title = request.nextUrl.searchParams.get("title");
//   const category = request.nextUrl.searchParams.get("category");

//   // authcheck
//   if (!(await authCheck())) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   if (category) {
//     const searchMoviesByCategory = await prisma.movie.findMany({
//       where: {
//         category: {
//           contains: category,
//           mode: "insensitive",
//         },
//       },
//     });
//     return NextResponse.json(searchMoviesByCategory);
//   }

//   if (title) {
//     const searchMoviesByTitle = await prisma.movie.findMany({
//       where: {
//         title: {
//           contains: title,
//           mode: "insensitive",
//         },
//       },
//     });

//     return NextResponse.json(searchMoviesByTitle);
//   }

//   const movies = await prisma.movie.findMany();

//   return NextResponse.json(movies, { status: 200 });
// }

export async function POST(request: NextRequest) {
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

  const newMovie = await prisma.movie.create({
    data: parsedMovie.data,
  });

  return NextResponse.json(newMovie, { status: 201 });
}
