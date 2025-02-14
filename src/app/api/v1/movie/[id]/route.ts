import { findUniqueMovie } from "@/db/query/movie";
import { cacheFetch } from "@/lib/redis";
import { response } from "@/lib/response";
import { ParamsProps } from "@/types/base";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsProps) {
  const id = params["id"];

  if (!id) {
    return response({ error: "Please provide a movie id" }, { status: 400 });
  }

  const searchMovie = await cacheFetch(
    `movie:${id}`,
    async () => await findUniqueMovie(id)
  );

  return response(searchMovie, { status: 200 });
}
