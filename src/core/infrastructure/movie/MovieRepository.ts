import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Movie } from "@/core/entity/Movie";
import { IMovieRepository } from "./IMovieRepository";

export interface GetAllMoviesSearchParams
  extends Prisma.MovieFindManyArgs<DefaultArgs> {}

export class MovieRepository implements IMovieRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  // TODO
  async addCategory(movieId: string, categoryId: string): Promise<void> {
    try {
      await this.prisma.movieCategory.create({
        data: {
          movieId,
          categoryId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new Error("Category already exists for this movie");
        }
        if (error.code === "P2003") {
          throw new Error("Movie or category not found");
        }
      }
      throw error;
    }
  }

  // TODO
  async removeCategory(movieId: string, categoryId: string): Promise<void> {
    try {
      await this.prisma.movieCategory.delete({
        where: {
          movieId_categoryId: {
            movieId,
            categoryId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new Error("Category not found for this movie");
        }
      }
      throw error;
    }
  }

  async get(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });
    if (!movie) return null;

    return movie;
  }

  async getAll(option?: GetAllMoviesSearchParams): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany(option);

    return movies.map((movie) => movie);
  }

  async create(data: Omit<Movie, "id">): Promise<Movie> {
    const newMovie = await this.prisma.movie.create({ data: data });
    return newMovie;
  }

  async update(id: string, data: Partial<Omit<Movie, "id">>): Promise<Movie> {
    const updatedMovie = await this.prisma.movie.update({
      where: {
        id,
      },
      data,
    });

    return updatedMovie;
  }

  async delete(id: string): Promise<Movie> {
    const deletedMovie = await this.prisma.movie.delete({
      where: { id },
    });

    return deletedMovie;
  }
}
