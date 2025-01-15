import { findManyCategory } from "@/db/query/category";
import { cacheFetch } from "@/lib/redis";
import { response } from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const categories = await cacheFetch(
    `category:all`,
    async () => await findManyCategory()
  );

  return response(categories);
}
