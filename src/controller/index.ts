import { MovieDatabase } from "@/database/MovieDatabase";
import { MovieController } from "./MovieController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const movieDatabase = new MovieDatabase(prisma);
export const movieController = new MovieController(movieDatabase);
