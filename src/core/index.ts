import { PrismaClient } from "@prisma/client";
import { MovieRepository } from "@/core/infrastructure/movie/MovieRepository";
import { MovieService } from "@/core/service/MovieService";
import { CategoryRepository } from "./infrastructure/category/CategoryRepository";

const prisma = new PrismaClient();
const movieRepository = new MovieRepository(prisma);
const categoryRepository = new CategoryRepository(prisma);
export const movieService = new MovieService(
  movieRepository,
  categoryRepository
);
