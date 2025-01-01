import { Movie } from "@/core/entity/Movie";
import {
  CreateMoviePayload,
  GetAllMoviesOption,
  IMovieRepository,
  UpdateMoviePayload,
} from "@/core/infrastructure/movie/IMovieRepository";
import { z } from "zod";
import { ICategoryRepository } from "../infrastructure/category/ICategoryRepository";

export class MovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async create(data: CreateMoviePayload): Promise<Movie | null> {
    if (!this.validateMovieData(data)) {
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
    return await this.movieRepository.get(id);
  }

  async update(
    id: string,
    data: Partial<UpdateMoviePayload>
  ): Promise<Movie | null> {
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

  async getAllCategory() {
    return await this.categoryRepository.getAll();
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

  // TODO
  async addMovieCategory(movieId: string, categoryId: string) {
    const movie = await this.movieRepository.get(movieId);
    const category = await this.categoryRepository.get(categoryId);

    if (!movie || !category) {
      throw new Error("Movie or category not found");
    }

    try {
      await this.movieRepository.addCategory(movieId, categoryId);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to add category: ${error.message}`);
      }
      throw error;
    }
  }
  async removeMovieCategory(
    movieId: string,
    categoryId: string
  ): Promise<void> {
    const movie = await this.movieRepository.get(movieId);
    const category = await this.categoryRepository.get(categoryId);

    if (!movie || !category) {
      throw new Error("Movie or category not found");
    }

    await this.movieRepository.removeCategory(movieId, categoryId);
  }

  async getMoviesByTitle(title: string): Promise<Movie[]> {
    return await this.movieRepository.getAll({
      title,
    });
  }

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

  async searchMovies(query: string): Promise<Movie[]> {
    if (!query) {
      throw new Error("Search query is required");
    }
    return this.movieRepository.getAll({});
  }

  async filterMoviesByRating(minRating: number): Promise<Movie[]> {
    if (!this.validateRating(minRating)) {
      throw new Error("Invalid rating value");
    }
    const movies = await this.movieRepository.getAll();
    return movies.filter((movie) => movie.rating >= minRating);
  }

  async filterMoviesByYear(year: number): Promise<Movie[]> {
    if (year < 1900 || year > new Date().getFullYear()) {
      throw new Error("Invalid year");
    }
    const movies = await this.movieRepository.getAll();
    return movies.filter((movie) => movie.release_year === year);
  }

  private validateMovieData(data: Partial<Movie>): boolean {
    const movieSchema = z.object({
      title: z.string().min(1).optional(),
      description: z.string().min(5).optional(),
      director: z.string().min(1).optional(),
      rating: z.number().min(0).max(10).optional(),
      release_year: z.number().min(1900).optional(),
      runtime: z.number().min(1).optional(),
    });

    return movieSchema.safeParse(data).success;
  }

  private validateRating(rating: number): boolean {
    return rating >= 0 && rating <= 10;
  }

  //
}
