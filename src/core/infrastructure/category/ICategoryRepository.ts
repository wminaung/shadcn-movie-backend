import { Category } from "@/core/entity/Category";

export interface GetAllCategoriesOption {
  name?: string;
  movieId?: string;
}
export interface CreateCategoryPayload extends Omit<Category, "id"> {}
export interface UpdateCategoryPayload extends CreateCategoryPayload {}

export interface ICategoryRepository {
  getAll(options?: GetAllCategoriesOption): Promise<Category[]>;
  get(id: string): Promise<Category | null>;
  create(data: Omit<Category, "id">): Promise<Category>;
  update(id: string, name: string): Promise<Category>;
  delete(id: string): Promise<Category>;
}
