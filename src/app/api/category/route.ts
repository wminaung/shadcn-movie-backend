import { findManyCategory } from "@/lib/categoryQueries";
import { response } from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const categories = await findManyCategory();
  return response(categories);
}
