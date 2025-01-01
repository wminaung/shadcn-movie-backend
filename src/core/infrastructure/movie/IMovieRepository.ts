import { Movie } from "@/core/entity/Movie";

export interface CreateMoviePayload extends Omit<Movie, "id"> {
  categoryIds?: string[];
}
export interface UpdateMoviePayload extends CreateMoviePayload {}

export interface GetAllMoviesOption {
  title?: string;
  category?: string;
  categoryId?: string;
}

export interface IMovieRepository {
  getAll(options?: GetAllMoviesOption): Promise<Movie[]>;
  get(id: string): Promise<Movie | null>;
  create(data: Omit<Movie, "id">): Promise<Movie>;
  update(id: string, data: Partial<Omit<Movie, "id">>): Promise<Movie>;
  delete(id: string): Promise<Movie>;
  addCategory(movieId: string, categoryId: string): Promise<void>;
  removeCategory(movieId: string, categoryId: string): Promise<void>;
}
