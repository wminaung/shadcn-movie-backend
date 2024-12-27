import { type NextRequest } from "next/server";

import { movieController } from "@/controller";

export async function POST(request: NextRequest) {
  return await movieController.create(request);
}
