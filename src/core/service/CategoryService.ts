import { Category } from "../entity/Category";
import {
  CreateCategoryPayload,
  GetAllCategoriesOption,
  ICategoryRepository,
  UpdateCategoryPayload,
} from "../infrastructure/category/ICategoryRepository";
import { IMovieRepository } from "../infrastructure/movie/IMovieRepository";
import { ICategoryValidation } from "../validation/ICategoryValidation";

export class CategoryService {
  constructor(
    private categoryRepository: ICategoryRepository,
    private categoryValidation: ICategoryValidation,
    private movieRepository: IMovieRepository
  ) {}

  async create(data: CreateCategoryPayload): Promise<Category | null> {
    if (!this.categoryValidation.createCategoryData(data)) {
      return null;
    }

    const movie = await this.categoryRepository.create(data);

    return movie;
  }

  async getAll(options?: GetAllCategoriesOption): Promise<Category[]> {
    return await this.categoryRepository.getAll(options);
  }

  async get(id: string): Promise<Category | null> {
    if (!id) return null;
    return await this.categoryRepository.get(id);
  }

  async update(
    id: string,
    data: Partial<UpdateCategoryPayload>
  ): Promise<Category | null> {
    const isValidData = this.categoryValidation.updateCategoryData(data);
    if (!id || !isValidData) return null;

    const { name } = data as Category;
    const movie = await this.categoryRepository.get(id);

    if (!movie) {
      return null;
    }

    const updatedCategory = await this.categoryRepository.update(id, name);

    return updatedCategory;
  }

  async delete(id: string): Promise<Category | null> {
    if (!id) return null;
    const categoryExist = await this.categoryRepository.get(id);
    if (!categoryExist) {
      return null;
    }
    const deletedCategory = await this.categoryRepository.delete(id);
    return deletedCategory;
  }

  async getCategoriesByMovieId(movieId: string) {
    const movie = await this.movieRepository.get(movieId);
    if (!movie) {
      throw new Error("Movie not found");
    }
    return await this.categoryRepository.getAll({
      movieId,
    });
  }

  //
}
