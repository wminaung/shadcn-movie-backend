import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Delete all existing data
  await prisma.movieCategory.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.category.deleteMany();

  console.log("Deleted all existing data");
  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: "Action" } }),
    prisma.category.create({ data: { name: "Comedy" } }),
    prisma.category.create({ data: { name: "Drama" } }),
    prisma.category.create({ data: { name: "Horror" } }),
    prisma.category.create({ data: { name: "Sci-Fi" } }),
  ]);

  // Create Movies
  const movies = await Promise.all([
    prisma.movie.create({
      data: {
        title: "Inception",
        release_year: 2010,
        description:
          "A thief who steals corporate secrets through dream-sharing technology.",
        rating: 8.8,
        director: "Christopher Nolan",
        runtime: 148,
        categories: {
          create: [
            { category: { connect: { name: "Action" } } },
            { category: { connect: { name: "Sci-Fi" } } },
          ],
        },
      },
    }),
    prisma.movie.create({
      data: {
        title: "The Dark Knight",
        release_year: 2008,
        description:
          "Batman fights against a criminal mastermind known as the Joker.",
        rating: 9.0,
        director: "Christopher Nolan",
        runtime: 152,
        categories: {
          create: [
            { category: { connect: { name: "Action" } } },
            { category: { connect: { name: "Drama" } } },
          ],
        },
      },
    }),
    prisma.movie.create({
      data: {
        title: "Pulp Fiction",
        release_year: 1994,
        description: "Interrelated stories about Los Angeles criminals.",
        rating: 8.9,
        director: "Quentin Tarantino",
        runtime: 154,
        categories: {
          create: [
            { category: { connect: { name: "Drama" } } },
            { category: { connect: { name: "Action" } } },
          ],
        },
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
