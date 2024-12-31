import { NextResponse, type NextRequest } from "next/server";
import { ParamsProps } from "@/types/base";
import { apiAuthCheck } from "@/lib/utils";
import { movieService } from "@/core";
import { Movie } from "@/core/entity/Movie";
import { ApiError } from "@/app/api/ApiError";

// Edit Movie

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  const token = apiAuthCheck(request);
  if (!token) {
    const apiError = new ApiError("Unauthorized", 401);
    return NextResponse.json(apiError, { status: 401 });
  }
  const id = params["id"];
  const newMovie = (await request.json()) as Movie;

  const updatedMovie = await movieService.update(id, newMovie);

  return NextResponse.json(updatedMovie ? updatedMovie : null, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  const token = apiAuthCheck(request);
  if (!token) {
    const apiError = new ApiError("Unauthorized", 401);
    return NextResponse.json(apiError, { status: 401 });
  }
  const id = params["id"];

  const deletedMovie = await movieService.delete(id);

  return NextResponse.json(deletedMovie, { status: 200 });
}
