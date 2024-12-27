import { type NextRequest } from "next/server";
import { ParamsProps, QueryProps } from "@/types/base";

import { movieController } from "@/controller";

// Edit Movie

export async function PUT(request: NextRequest, { params }: ParamsProps) {
  return movieController.update(request, { params });
}

export async function DELETE(request: NextRequest, { params }: ParamsProps) {
  return movieController.delete(request, { params });
}
