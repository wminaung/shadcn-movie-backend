import { movieService } from "@/core";
import { ParamsProps } from "@/types/base";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const id = params["id"];

  const searchMovie = await movieService.get(id);

  return NextResponse.json(searchMovie, { status: 200 });
}
