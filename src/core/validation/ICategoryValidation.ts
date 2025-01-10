import {
  CreateCategoryPayload,
  UpdateCategoryPayload,
} from "../infrastructure/category/ICategoryRepository";

export interface ICategoryValidation {
  createCategoryData: (data: CreateCategoryPayload) => boolean;
  updateCategoryData: (data: UpdateCategoryPayload) => boolean;
}
