import { CategoryRepository } from "../../infrastructure/category/CategoryRepository";
import { CreateMoviePayload } from "../../infrastructure/movie/IMovieRepository";
import { MovieRepository } from "../../infrastructure/movie/MovieRepository";
import { MovieService } from "../MovieService";
import { MovieValidation } from "../../validation/MovieValidation";
import { PrismaClient } from "@prisma/client";

describe("Movie Service", () => {
  let movieService: MovieService;
  let prisma: PrismaClient;
  let movieRepository: MovieRepository;
  let categoryRepository: CategoryRepository;
  let movieValidation: MovieValidation;

  beforeAll(async () => {
    prisma = new PrismaClient();
    movieRepository = new MovieRepository(prisma);
    categoryRepository = new CategoryRepository(prisma);
    movieValidation = new MovieValidation();

    movieService = new MovieService(
      movieRepository,
      movieValidation,
      categoryRepository
    );
    await prisma.$connect();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.movieCategory.deleteMany(); // Delete all relation
    await prisma.movie.deleteMany(); // Delete all movies
    await prisma.category.deleteMany(); // Delete all categories
  });

  afterAll(async () => {
    // Disconnect from the database after all tests
    await prisma.$disconnect();
  });

  it("should create a movie successfully without categories", async () => {
    const payload: CreateMoviePayload = {
      title: "Pulp Fiction",
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const result = await movieService.create(payload);

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: "Pulp Fiction",
        release_year: 1994,
        description: "Interrelated stories about Los Angeles criminals.",
        rating: 8.9,
        director: "Quentin Tarantino",
        runtime: 154,
        image: expect.any(String),
      })
    );

    const movieInDb = await prisma.movie.findUnique({
      where: { id: result?.id },
    });
    expect(movieInDb).toEqual(result);
  });

  it("should return null if movie-create validation fails", async () => {
    const payload: CreateMoviePayload = {
      title: "", // Invalid title
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };

    const result = await movieService.create(payload);

    expect(result).toBeNull();
  });

  it("should return an array of movies", async () => {
    const samplePayload: CreateMoviePayload[] = [
      {
        title: "Pulp Fiction",
        release_year: 1994,
        description: "Interrelated stories about Los Angeles criminals.",
        rating: 8.9,
        director: "Quentin Tarantino",
        runtime: 154,
      },
      {
        title: "The Shawshank Redemption",
        release_year: 1994,
        description:
          "Two imprisoned men bond over several years, finding solace and eventual redemption.",
        rating: 9.3,
        director: "Frank Darabont",
        runtime: 142,
      },
    ];

    for (const payload of samplePayload) {
      await movieService.create(payload);
    }

    const result = await movieService.getAll();

    expect(result.length).toBe(samplePayload.length);
  });

  it("should get Movie By Id", async () => {
    const payload: CreateMoviePayload = {
      title: "Pulp Fiction",
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const result = await movieService.create(payload);
    const resultId = result?.id;

    const movie = await movieService.get(resultId!);

    expect(result).toEqual(movie);
  });

  it("should update Movie with id ", async () => {
    const payload: CreateMoviePayload = {
      title: "Pulp Fiction",
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const result = await movieService.create(payload);
    const resultId = result?.id;
    const newPayload = {
      title: "Pulp Fiction 2", // updated title
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const updatedMovie = await movieService.update(resultId!, newPayload);
    expect(updatedMovie?.title).toEqual(newPayload.title);
  });

  it("should return null if movie-update validation fails", async () => {
    const payload: CreateMoviePayload = {
      title: "Pulp Fiction",
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const result = await movieService.create(payload);
    const resultId = result?.id;
    const newPayload = {
      title: "", // Invalid title
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const updatedMovie = await movieService.update(resultId!, newPayload);
    expect(updatedMovie).toBeNull();
  });

  it("should return null if id does not exist", async () => {
    const payload: CreateMoviePayload = {
      title: "Pulp Fiction",
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    const updatedMovie = await movieService.update("null", payload);
    expect(updatedMovie).toBeNull();
  });

  it("should delete Movie with id ", async () => {
    const payload: CreateMoviePayload = {
      title: "Pulp Fiction",
      release_year: 1994,
      description: "Interrelated stories about Los Angeles criminals.",
      rating: 8.9,
      director: "Quentin Tarantino",
      runtime: 154,
    };
    let result = await movieService.create(payload);
    const resultId = result?.id;
    await movieService.delete(resultId!);
    const foundMovie = await movieService.get(resultId!);
    expect(foundMovie).toBeNull();
  });
});
