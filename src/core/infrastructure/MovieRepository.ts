import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Movie } from "@/core/entity/Movie";
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

    return movie;
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
