import { movieService } from "@/core";
import { CreateMoviePayload } from "@/core/infrastructure/movie/IMovieRepository";
import { apiAuthCheck } from "@/lib";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const token = apiAuthCheck(request);
  if (!token) {
    return NextResponse.json(
      { error: "unauthorized, Please get token first" },
      { status: 401 }
    );
  }
  const data = (await request.json()) as CreateMoviePayload;

  const newMovie = await movieService.create(data);

  return NextResponse.json(newMovie, { status: 201 });
}
