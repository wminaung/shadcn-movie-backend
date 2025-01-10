import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateCategoryPayload,
  GetAllCategoriesOption,
  ICategoryRepository,
} from "./ICategoryRepository";
import { Category } from "@/core/entity/Category";
import { DefaultArgs } from "@prisma/client/runtime/library";

// extends Prisma.CategoryFindManyArgs<DefaultArgs>

export class CategoryRepository implements ICategoryRepository {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async get(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!category) return null;

    return category;
  }

  private generateGetAllCategoriesOption(
    option?: GetAllCategoriesOption
  ): Prisma.CategoryFindManyArgs<DefaultArgs> {
    const { movieId, name } = option || {};

    if (movieId) {
      return {
        where: {
          movies: {
            some: {
              movieId: movieId,
            },
          },
        },
        orderBy: {
          name: "asc",
        },
      };
    }
    if (name) {
      return {
        where: {
          name: {
            contains: name,
            mode: "insensitive",
          },
        },
        orderBy: {
          name: "asc",
        },
      };
    }

    return {
      orderBy: {
        name: "asc",
      },
    };
  }

  async getAll(option?: GetAllCategoriesOption): Promise<Category[]> {
    const GetAllCategoriesOption = this.generateGetAllCategoriesOption(option);
    const categories = await this.prisma.category.findMany(
      GetAllCategoriesOption
    );

    return categories.map((category) => category);
  }

  async create(data: CreateCategoryPayload): Promise<Category> {
    const category = await this.prisma.category.create({ data: data });
    return category;
  }

  async update(id: string, name: string): Promise<Category> {
    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    return category;
  }

  async delete(id: string): Promise<Category> {
    const category = await this.prisma.category.delete({
      where: { id },
    });

    return category;
  }
}
