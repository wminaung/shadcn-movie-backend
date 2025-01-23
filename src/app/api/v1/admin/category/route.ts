import { NextResponse, type NextRequest } from "next/server";
import { apiAuthCheck } from "@/lib";
import { categoryService } from "@/core";
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "@/core/infrastructure/category/ICategoryRepository";

export async function GET(request: NextRequest) {
  const token = await apiAuthCheck(request);
  if (!token) {
    return NextResponse.json(
      { error: "unauthorized, Please get token first" },
      { status: 401 }
    );
  }

  const category = await categoryService.getAll();

  return NextResponse.json(category ? category : null, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const token = await apiAuthCheck(request);
  if (!token) {
    return NextResponse.json(
      { error: "unauthorized, Please get token first" },
      { status: 401 }
    );
  }
  const data = (await request.json()) as CreateCategoryPayload;
  const category = await categoryService.create(data);

  return NextResponse.json(category ? category : null, {
    status: 200,
  });
}

// export async function PUT(request: NextRequest) {
//   const token = await apiAuthCheck(request);
//   if (!token) {
//     return NextResponse.json(
//       { error: "unauthorized, Please get token first" },
//       { status: 401 }
//     );
//   }
//   const data = (await request.json()) as UpdateCategoryPayload;

//   const category = await categoryService.update(data.id, data);

//   return NextResponse.json(category ? category : null, {
//     status: 200,
//   });
// }
