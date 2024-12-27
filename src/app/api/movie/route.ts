import { movieController } from "@/controller";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return await movieController.getAll(request);
}
