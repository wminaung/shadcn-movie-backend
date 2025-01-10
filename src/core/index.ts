import {
  createCategoryService,
  createMovieService,
} from "./movieServiceFactory";

export const movieService = createMovieService(); // Service is created with dependencies
export const categoryService = createCategoryService();
