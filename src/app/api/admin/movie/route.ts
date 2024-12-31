import { movieService } from "@/core";
import { CreateMoviePayload } from "@/core/infrastructure/movie/IMovieRepository";
import { apiAuthCheck } from "@/lib/utils";
import { ApiError } from "@/app/api/ApiError";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const token = apiAuthCheck(request);
  if (!token) {
    const apiError = new ApiError("unauthorized", 401);
    return NextResponse.json(apiError, { status: 401 });
  }
  const data = (await request.json()) as CreateMoviePayload;

  const newMovie = await movieService.create(data);

  return NextResponse.json(newMovie, { status: 201 });
}
