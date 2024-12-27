import { movieService } from "@/core";
import { CreateMoviePayload } from "@/core/infrastructure/IMovieRepository";
import { authCheck } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = (await request.json()) as CreateMoviePayload;

  const newMovie = await movieService.create(data);

  return NextResponse.json(newMovie, { status: 201 });
}
