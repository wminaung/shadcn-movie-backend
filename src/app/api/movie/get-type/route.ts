import { response } from "@/lib/response";

import { type NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
  const filePath = path.join(
    process.cwd(),
    `src/app/api/movie/get-type`,
    `response-type.ts`
  );
  const movie_response = fs.readFileSync(filePath, "utf-8");
  const movie_entity = fs.readFileSync(
    path.join(process.cwd(), `src/core/entity`, `Movie.ts`),
    "utf-8"
  );
  const category_entity = fs.readFileSync(
    path.join(process.cwd(), `src/core/entity`, `Category.ts`),
    "utf-8"
  );
  return response(
    {
      movie_response,
      movie_entity,
      category_entity,
    },
    {
      status: 200,
    }
  );
}
