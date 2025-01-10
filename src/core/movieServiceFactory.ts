import { PrismaClient } from "@prisma/client";
import { MovieRepository } from "@/core/infrastructure/movie/MovieRepository";
import { MovieService } from "@/core/service/MovieService";
import { CategoryRepository } from "./infrastructure/category/CategoryRepository";
import { MovieValidation } from "./validation/MovieValidation";
import { CategoryValidation } from "./validation/CategoryValidation";
import { CategoryService } from "./service/CategoryService";

const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

export const createMovieService = () => {
  const prisma = new PrismaClient();
  const movieRepository = new MovieRepository(prisma);
  const categoryRepository = new CategoryRepository(prisma);
  const movieValidation = new MovieValidation();

  return new MovieService(movieRepository, movieValidation, categoryRepository);
};

export const createCategoryService = () => {
  const prisma = new PrismaClient();
  const categoryRepository = new CategoryRepository(prisma);
  const categoryValidation = new CategoryValidation();
  const movieRepository = new MovieRepository(prisma);

  return new CategoryService(
    categoryRepository,
    categoryValidation,
    movieRepository
  );
};
