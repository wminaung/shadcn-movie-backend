import { z } from "zod";
import {
  CreateMoviePayload,
  UpdateMoviePayload,
} from "../infrastructure/movie/IMovieRepository";
import { IMovieValidation } from "./IMovieValidation";

export class MovieValidation implements IMovieValidation {
  private titleSchema = z.string().min(1);
  private descriptionSchema = z.string().min(3);
  private directorSchema = z.string().min(1);
  private ratingSchema = z.number().min(0).max(10);
  private releaseYearSchema = z.number().min(1900);
  private runtimeSchema = z.number().min(1);
  private imageSchema = z.string().min(3);
  private categoryIdsSchema = z.array(z.string());

  public createMovieData(data: CreateMoviePayload) {
    const movieSchema = z.object({
      title: this.titleSchema,
      description: this.descriptionSchema,
      director: this.directorSchema,
      rating: this.ratingSchema,
      release_year: this.releaseYearSchema,
      runtime: this.runtimeSchema,
      image: this.imageSchema.optional(),
      categoryIds: this.categoryIdsSchema.optional(),
    });

    const result = movieSchema.safeParse(data);

    if (result.error) {
      const error = result.error;
      console.warn(error.name, error.message);
      return false;
    }
    return result.success;
  }

  public updateMovieData(data: Partial<UpdateMoviePayload>) {
    const movieSchema = z.object({
      title: this.titleSchema.optional(),
      description: this.descriptionSchema.optional(),
      director: this.directorSchema.optional(),
      rating: this.ratingSchema.optional(),
      release_year: this.releaseYearSchema.optional(),
      runtime: this.runtimeSchema.optional(),
      image: this.imageSchema.optional(),
      categoryIds: this.categoryIdsSchema.optional(),
    });
    const result = movieSchema.safeParse(data);
    if (result.error) {
      console.error(result.error);
      return false;
    }

    return result.success;
  }
}
