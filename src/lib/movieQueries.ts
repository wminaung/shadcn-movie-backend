import { db } from "./db";

export const findManyMovie = async () => {
  const movies = await db.movie.findMany({
    include: {
      categories: {
        select: {
          category: true,
        },
      },
    },
  });
  return movies;
};

export const findManyMovieByTitle = async (title: string) => {
  const movies = await db.movie.findMany({
    include: {
      categories: {
        select: {
          category: true,
        },
      },
    },
    where: {
      title,
    },
  });
  return movies;
};

export const findManyMovieCategoryName = async (categoryName: string) => {
  const movies = await db.movie.findMany({
    include: {
      categories: {
        select: {
          category: true,
        },
      },
    },
    where: {
      categories: {
        some: {
          category: {
            name: {
              equals: categoryName,
              mode: "insensitive",
            },
          },
        },
      },
    },
  });
  return movies;
};

export const findManyMovieCategoryId = async (categoryId: string) => {
  const movies = await db.movie.findMany({
    include: {
      categories: {
        select: {
          category: true,
        },
      },
    },
    where: {
      categories: {
        some: {
          categoryId: categoryId,
        },
      },
    },
  });
  return movies;
};

export const findUniqueMovie = async (movieId: string) => {
  const movie = await db.movie.findUnique({
    include: {
      categories: {
        select: {
          category: true,
        },
      },
    },
    where: { id: movieId },
  });
  return movie;
};
