import { type NextRequest } from "next/server";

import { movieController } from "@/core";

export async function POST(request: NextRequest) {
  return await movieController.create(request);
}
