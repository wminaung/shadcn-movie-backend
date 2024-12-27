import { PrismaClient } from "@prisma/client";
import { MovieRepository } from "./infrastructure/MovieRepository";
import { MovieService } from "./service/MoiveService";

const prisma = new PrismaClient();
const movieRepository = new MovieRepository(prisma);
export const movieService = new MovieService(movieRepository);
