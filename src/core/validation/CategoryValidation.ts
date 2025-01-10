import { z } from "zod";
import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../infrastructure/category/ICategoryRepository";
import { ICategoryValidation } from "./ICategoryValidation";

export class CategoryValidation implements ICategoryValidation {
  private categoryNameSchema = z.string().min(1);

  createCategoryData(data: CreateCategoryPayload) {
    const categorySchema = z.object({ name: this.categoryNameSchema });
    const result = categorySchema.safeParse(data);
    if (result.error) {
      console.error(result.error);
      return false;
    }
    return result.success;
  }

  updateCategoryData(data: UpdateCategoryPayload) {
    const categorySchema = z.object({ name: this.categoryNameSchema });

    const result = categorySchema.safeParse(data);

    if (result.error) {
      console.error(result.error);
      return false;
    }

    return result.success;
  }

  //
}
