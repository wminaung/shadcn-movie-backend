import { Movie, Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class MovieDatabase {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getAll(
    option?: Prisma.MovieFindManyArgs<DefaultArgs>
  ): Promise<Movie[]> {
    return await this.prisma.movie.findMany(option);
  }

  async get(id: string): Promise<Movie | null> {
    return await this.prisma.movie.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Omit<Movie, "id">): Promise<Movie> {
    return await this.prisma.movie.create({ data: data });
  }

  async update(id: string, data: Partial<Omit<Movie, "id">>): Promise<Movie> {
    return await this.prisma.movie.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<Movie> {
    return await this.prisma.movie.delete({
      where: { id },
    });
  }
}
