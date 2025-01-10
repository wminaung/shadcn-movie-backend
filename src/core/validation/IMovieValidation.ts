import {
  CreateMoviePayload,
  UpdateMoviePayload,
} from "../infrastructure/movie/IMovieRepository";

export interface IMovieValidation {
  createMovieData: (data: CreateMoviePayload) => boolean;
  updateMovieData: (data: Partial<UpdateMoviePayload>) => boolean;
}
