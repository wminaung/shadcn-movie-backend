import { Movie } from "@/core/entity/Movie";
import {
  CreateMoviePayload,
  GetAllMoviesOption,
  IMovieRepository,
  UpdateMoviePayload,
} from "@/core/infrastructure/movie/IMovieRepository";
import { ICategoryRepository } from "../infrastructure/category/ICategoryRepository";
import { IMovieValidation } from "../validation/IMovieValidation";

export class MovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private movieValidation: IMovieValidation,
    private categoryRepository: ICategoryRepository
  ) {}

  async create(data: CreateMoviePayload): Promise<Movie | null> {
    if (!this.movieValidation.createMovieData(data)) {
      return null;
    }

    // Extract categoryIds from payload
    const { categoryIds, ...movieData } = data;

    // Create movie first
    const movie = await this.movieRepository.create(movieData);

    // Add categories if provided
    if (categoryIds && categoryIds.length > 0) {
      try {
        for (const categoryId of categoryIds) {
          await this.movieRepository.addCategory(movie.id, categoryId);
        }
      } catch (error) {
        // If adding categories fails, delete the movie
        await this.movieRepository.delete(movie.id);
        throw new Error("Failed to add categories to movie");
      }
    }

    return movie;
  }

  async getAll(option?: GetAllMoviesOption): Promise<Movie[]> {
    return await this.movieRepository.getAll(option);
  }

  async get(id: string): Promise<Movie | null> {
    if (!id) return null;
    return await this.movieRepository.get(id);
  }

  async update(
    id: string,
    data: Partial<UpdateMoviePayload>
  ): Promise<Movie | null> {
    const isValidData = this.movieValidation.updateMovieData(data);
    if (!id || !isValidData) return null;

    const { categoryIds, ...dataToUpdate } = data;
    const movie = await this.movieRepository.get(id);

    if (!movie) {
      return null;
    }

    // First update the movie basic data
    const updatedMovie = await this.movieRepository.update(id, dataToUpdate);

    // If categoryIds are provided, update categories
    if (categoryIds && categoryIds.length > 0) {
      // Get existing categories for cleanup
      const existingCategories = await this.getCategoriesByMovieId(id);

      // Remove existing categories
      for (const category of existingCategories) {
        await this.movieRepository.removeCategory(id, category.id);
      }

      // Add new categories
      for (const categoryId of categoryIds) {
        await this.movieRepository.addCategory(id, categoryId);
      }
    }

    return updatedMovie;
  }

  async delete(id: string): Promise<Movie | null> {
    if (!id) return null;
    const movieExist = await this.movieRepository.get(id);
    if (!movieExist) {
      return null;
    }
    const deletedMovie = await this.movieRepository.delete(id);
    return deletedMovie;
  }

  async deleteMoviesByCategoryIds(
    id: string,
    categoryIds?: string[]
  ): Promise<Movie | null> {
    if (!id) return null;

    const movieExist = await this.movieRepository.get(id);
    if (!movieExist) {
      return null;
    }
    categoryIds = categoryIds || [];
    for (const categoryId of categoryIds) {
      await this.movieRepository.removeCategory(id, categoryId);
    }
    const deletedMovie = await this.movieRepository.delete(id);
    return deletedMovie;
  }

  async getMoviesByTitle(title: string): Promise<Movie[]> {
    return await this.movieRepository.getAll({
      title,
    });
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

  // ?! idk
  // async addMovieCategory(movieId: string, categoryId: string) {
  //   const movie = await this.movieRepository.get(movieId);
  //   const category = await this.categoryRepository.get(categoryId);

  //   if (!movie || !category) {
  //     throw new Error("Movie or category not found");
  //   }

  //   try {
  //     await this.movieRepository.addCategory(movieId, categoryId);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       throw new Error(`Failed to add category: ${error.message}`);
  //     }
  //     throw error;
  //   }
  // }
  // ?! idk
  // async removeMovieCategory(
  //   movieId: string,
  //   categoryId: string
  // ): Promise<void> {
  //   const movie = await this.movieRepository.get(movieId);
  //   const category = await this.categoryRepository.get(categoryId);

  //   if (!movie || !category) {
  //     throw new Error("Movie or category not found");
  //   }

  //   await this.movieRepository.removeCategory(movieId, categoryId);
  // }

  async getMoviesByCategoryName(categoryName: string): Promise<Movie[]> {
    if (!categoryName) {
      throw new Error("Category name is required");
    }

    const categories = await this.categoryRepository.getAll({
      name: categoryName,
    });

    if (!categories.length) {
      throw new Error(`Category not found: ${categoryName}`);
    }

    return this.movieRepository.getAll({
      category: categoryName,
    });
  }

  async getMoviesByCategoryId(categoryId: string): Promise<Movie[]> {
    const category = await this.categoryRepository.get(categoryId);
    if (!category) {
      throw new Error("Category not found");
    }
    return this.movieRepository.getAll({
      categoryId: categoryId,
    });
  }
}
