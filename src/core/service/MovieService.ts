import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Movie } from "@/core/entity/Movie";
import {
  IMovieRepository,
  SearchOption,
} from "@/core/infrastructure/IMovieRepository";
import { z } from "zod";

export class MovieService {
  constructor(private movieRepository: IMovieRepository) {}

  async create(data: Omit<Movie, "id">): Promise<Movie | null> {
    const {
      title,
      category,
      description,
      director,
      rating,
      release_year,
      runtime,
    } = data;

    const movieSchema = z.object({
      title: z.string().min(1, "Title is required"),
      category: z.string().min(2, "Category is required"),
      description: z.string().min(5, "Description is required"),
      director: z.string().min(1, "Director is required"),
      rating: z.number().min(0).max(10, "Rating must be between 0 and 10"),
      release_year: z.number().int().positive("Release year is required"),
      runtime: z.number().int().positive("Runtime is required"),
    });

    const parsedMovie = movieSchema.safeParse({
      title,
      category,
      description,
      director,
      rating,
      release_year,
      runtime,
    });

    if (!parsedMovie.success) {
      return null;
    }
    return await this.movieRepository.create(data);
  }

  async getAll(option?: SearchOption): Promise<Movie[]> {
    return await this.movieRepository.getAll(option);
  }

  async get(id: string): Promise<Movie | null> {
    return await this.movieRepository.get(id);
  }

  async update(
    id: string,
    data: Partial<Omit<Movie, "id">>
  ): Promise<Movie | null> {
    const movie = await this.movieRepository.get(id);

    if (!movie) {
      console.log("no Movie >>>>>>>>>>>>>>>");
      return null;
    }

    if (JSON.stringify(movie) === JSON.stringify(data)) {
      console.log("No changes detected, update not required.");
      return null;
    }

    return await this.movieRepository.update(id, data);
  }

  async delete(id: string): Promise<Movie | null> {
    try {
      const deletedMovie = await this.movieRepository.delete(id);
      return deletedMovie;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null;
      }
      throw error;
    }
  }

  //
}
