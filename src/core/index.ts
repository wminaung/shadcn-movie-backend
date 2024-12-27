import { PrismaClient } from "@prisma/client";
import { MovieRepository } from "@/core/infrastructure/MovieRepository";
import { MovieService } from "@/core/service/MovieService";

const prisma = new PrismaClient();
const movieRepository = new MovieRepository(prisma);
export const movieService = new MovieService(movieRepository);
