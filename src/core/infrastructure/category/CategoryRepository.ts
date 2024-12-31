import { Prisma, PrismaClient } from "@prisma/client";
import { ICategoryRepository } from "./ICategoryRepository";
import { Category } from "@/core/entity/Category";
import { DefaultArgs } from "@prisma/client/runtime/library";

export interface GetAllCategoriesSearchParams
  extends Prisma.CategoryFindManyArgs<DefaultArgs> {}

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

  async getAll(option?: GetAllCategoriesSearchParams): Promise<Category[]> {
    const categories = await this.prisma.category.findMany(option);

    return categories.map((category) => category);
  }

  async create(data: Omit<Category, "id">): Promise<Category> {
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
