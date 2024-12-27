import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Movie } from "../entity/Movie";
import { IMovieRepository, SearchOption } from "./IMovieRepository";

export class MovieRepository implements IMovieRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async get(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });
    if (!movie) return null;

    return new Movie(
      movie.id,
      movie.title,
      movie.category,
      movie.release_year,
      movie.description,
      movie.rating,
      movie.director,
      movie.runtime
    );
  }

  private buildSearchQuery(
    option?: SearchOption
  ): Prisma.MovieFindManyArgs<DefaultArgs> {
    return {
      where: {
        ...(option?.category && {
          category: {
            contains: option.category,
            mode: "insensitive",
          },
        }),
        ...(option?.title && {
          title: {
            contains: option.title,
            mode: "insensitive",
          },
        }),
      },
    };
  }

  async getAll(option?: SearchOption): Promise<Movie[]> {
    const query = this.buildSearchQuery(option);
    const movies = await this.prisma.movie.findMany(query);
    return movies.map(
      (movie) =>
        new Movie(
          movie.id,
          movie.title,
          movie.category,
          movie.release_year,
          movie.description,
          movie.rating,
          movie.director,
          movie.runtime
        )
    );
  }

  async create(data: Omit<Movie, "id">): Promise<Movie> {
    const newMovie = await this.prisma.movie.create({ data: data });
    return new Movie(
      newMovie.id,
      newMovie.title,
      newMovie.category,
      newMovie.release_year,
      newMovie.description,
      newMovie.rating,
      newMovie.director,
      newMovie.runtime
    );
  }

  async update(id: string, data: Partial<Omit<Movie, "id">>): Promise<Movie> {
    const updatedMovie = await this.prisma.movie.update({
      where: {
        id,
      },
      data,
    });

    return new Movie(
      updatedMovie.id,
      updatedMovie.title,
      updatedMovie.category,
      updatedMovie.release_year,
      updatedMovie.description,
      updatedMovie.rating,
      updatedMovie.director,
      updatedMovie.runtime
    );
  }

  async delete(id: string): Promise<Movie> {
    const deletedMovie = await this.prisma.movie.delete({
      where: { id },
    });

    return new Movie(
      deletedMovie.id,
      deletedMovie.title,
      deletedMovie.category,
      deletedMovie.release_year,
      deletedMovie.description,
      deletedMovie.rating,
      deletedMovie.director,
      deletedMovie.runtime
    );
  }
}
