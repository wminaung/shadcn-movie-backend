import { Category } from "@/core/entity/Category";
import { GetAllCategoriesSearchParams } from "./CategoryRepository";

export interface ICategoryRepository {
  getAll(options?: GetAllCategoriesSearchParams): Promise<Category[]>;
  get(id: string): Promise<Category | null>;
  create(data: Omit<Category, "id">): Promise<Category>;
  update(id: string, name: string): Promise<Category>;
  delete(id: string): Promise<Category>;
}
