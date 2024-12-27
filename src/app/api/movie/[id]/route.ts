import { movieController } from "@/core";
import { ParamsProps } from "@/types/base";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: ParamsProps) {
  return movieController.get(request, { params });
}
