import { movieService } from "@/core";
import { MoviePayload } from "@/hooks/use-create-movie";
import { authCheck } from "@/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (!(await authCheck())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = (await request.json()) as MoviePayload;

  const newMovie = await movieService.create(data);

  return NextResponse.json(newMovie, { status: 201 });
}
