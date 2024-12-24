import prisma from "@/lib/prisma";
import { ParamsProps } from "@/types/base";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const id = params["id"];

  if (!id) {
    return NextResponse.json(
      { message: `Params Error params=${id}` },
      { status: 404 }
    );
  }

  const searchMovie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });

  if (!searchMovie) {
    return NextResponse.json(
      { message: `Theres is no movie for id=${id}` },
      { status: 404 }
    );
  }

  return NextResponse.json(searchMovie, { status: 200 });
}
