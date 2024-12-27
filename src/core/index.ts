import { MovieDatabase } from "@/core/database/MovieDatabase";
import { MovieController } from "./controller/MovieController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const movieDatabase = new MovieDatabase(prisma);
export const movieController = new MovieController(movieDatabase);
